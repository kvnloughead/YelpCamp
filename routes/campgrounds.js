const express = require("express"),
      Campground = require("../models/campground")

const router  = express.Router(); 

//INDEX - show all campgrounds
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }})
});

//CREATE - create new campground 
router.post("/", isLoggedIn, function(req, res) {
    // add new campground to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCampground = {name: name, image: image, description: description, author: author};
    console.log(newCampground)
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
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW - shows info about a particular campground
router.get("/:id", function(req, res){
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
});

// EDIT campground route
router.get("/:id/edit", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/camgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    })
});

// UPDATE campground route
router.put("/:id", function(req, res){
    // find and update campground
    Campground.findByIdAndUpdate(
                    req.params.id, 
                    req.body.campground, 
                    function(err, updatedCampground){
                        if(err){
                            res.redirect("/");
                            } else {
                                res.redirect("/campgrounds/" + req.params.id);
                            }
    });
    // redirect to show page for campground
});

// DESTROY Campground Route
router.delete("/:id", function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});

// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;