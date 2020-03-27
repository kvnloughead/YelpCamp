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
router.post("/", function(req, res) {
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
router.get("/new", function(req, res){
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

module.exports = router;