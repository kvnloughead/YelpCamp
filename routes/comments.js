const express    = require("express"),
      Campground = require("../models/campground");
      Comment    = require("../models/comment");
      middleware = require("../middleware/index.js")

const router  = express.Router({mergeParams: true});

// Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
    // lookup campground using id
    Campground.findById(req.params.id).exec(function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            // create new comment: req.body.comment contains data from new comment form
            Comment.create(req.body.comment, function(err, comment){ 
                if(err){
                    req.flash("error", "Something went wrong");
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
                    req.flash("success", "Successfully created comment")
                    res.redirect("/campgrounds/" + campground._id);
                    // redirect to campground show page
                }
            })
            
        }
    })
});

// Edit Comments
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "No campground found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Something went wrong")
                res.redirect("back");
            } else {
                res.render("comments/edit", {campground_id: req.params.id,
                                             comment: foundComment});
            }
        });
    });
});

// Update Comments
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, 
    req.body.comment, function(err, updatedComment){
        if(err){
            req.flash("error", "Something went wrong")
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

// Delete Comments
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash("error", "Something went wrong")
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;
