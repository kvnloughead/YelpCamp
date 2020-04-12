const express = require("express"),
      passport = require("passport"),
      User = require("../models/user");
      
const router = express.Router();

//show register form
router.get("/register", function(req, res){
    res.render("register");
});

// handle sign up logic
router.post("/register", function(req, res){
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err)
        {
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });  
    });
});

// show login form
router.get("/login", function(req, res){
    res.render("login");
})
// handle login logic
router.post("/login", 
         passport.authenticate("local",
                               { successRedirect: "/campgrounds",
                                 failureRedirect: "/login"
                               }), 
         function(req, res){
// empty function: login logic handled by passport.authenticate middleware
}); 

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You are logged out!")
    res.redirect("/campgrounds");
});

module.exports = router;