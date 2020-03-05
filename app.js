const express    = require("express"),
      app        = express(),
      request    = require("request"),
      mongoose   = require("mongoose"),
      bodyParser = require("body-parser"),
      Campground = require("./models/campground"),
      Comment    = require("./models/comment"),
      seedDB     = require("./seeds");


seedDB();

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useUnifiedTopology: true,
    useNewUrlParser: true
}); 

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("landing");
}); 

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds})
        }
    })
});

//CREATE - create new campground 
app.post("/campgrounds", function(req, res) {
    // add new campground to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampground = {name: name, image: image, description: description};
    // Create new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            // TODO redirect back to form with message
            console.log(err)
        } else {
            //redirect to campgrounds (used GET by default)
            res.redirect("/campgrounds");      
        }
    })
});

//NEW - show new campground form
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

//SHOW - shows info about a particular campground
app.get("/campgrounds/:id", function(req, res){
    // find campground with _id=id, using built-in Mongo method
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            // render SHOW template for that campground
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
})

// ==================================
// COMMENTS ROUTES
// ==================================

app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id).exec(function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
})

app.post("/campgrounds/:id/comments", function(req, res){
    // lookup campground using id
    Campground.findById(req.params.id).exec(function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            // create new comment: req.body.comment contains data from new comment form
            Comment.create(req.body.comment, function(err, comment){ 
                if(err){
                    console.log(err);
                } else {
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                    // redirect to campground show page
                }
            })
            
        }
    })
})

app.listen(3000, function(){
    console.log("Serving YelpCamp at port 3000...")
});