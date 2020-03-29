const express = require("express"),
      Campground = require("../models/campground");
      Comment = require("../models/comment");

const router  = express.Router({mergeParams: true});

// Comments New
router.get("/new", isLoggedIn, function(req, res){
    // login locked
    Campground.findById(req.params.id).exec(function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
})

// Comments Create
router.post("/", isLoggedIn, function(req, res){
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
                    // add username and id to new comment
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    //save comment
                    comment.save(); 
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                    // redirect to campground show page
                }
            })
            
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
