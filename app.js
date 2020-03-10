const express       = require("express"),
      app           = express(),
      request       = require("request"),
      mongoose      = require("mongoose"),
      passport      = require("passport"),
      LocalStrategy = require("passport-local"),
      bodyParser    = require("body-parser"),
      Campground    = require("./models/campground"),
      Comment       = require("./models/comment"),
      User          = require("./models/user"),
      seedDB        = require("./seeds");


seedDB();

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useUnifiedTopology: true,
    useNewUrlParser: true
}); 

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// ========================
// * Passport Configuration
// ========================

app.use(require("express-session")({
    secret: "Top secret documents enclosed",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Ensure that user data is available to all routes
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// =============
// * Routes
// =============

app.get("/", function(req, res){
    res.render("landing");
}); 

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }})
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
// * COMMENTS ROUTES
// ==================================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    // login locked
    Campground.findById(req.params.id).exec(function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
})

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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

// =============
// * AUTH ROUTES
// =============

//show register form
app.get("/register", function(req, res){
    res.render("register");
});

// handle signup logic
app.post("/register", function(req, res){
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log("Error registering user, username =" + req.body.username);
            console.log(err);
            return res.render("register);")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });  
    });
});

// show login form
app.get("/login", function(req, res){
    res.render("login");
})
// handle login logic
app.post("/login", 
         passport.authenticate("local",
                               { successRedirect: "/campgrounds",
                                 failureRedirect: "/login"
                               }), 
         function(req, res){
// empty function: login logic handled by passport.authenticate middleware
}); 

// logout route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

// ============
// * Middleware
// ============

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



app.listen(3000, function(){
    console.log("Serving YelpCamp at port 3000...")
});