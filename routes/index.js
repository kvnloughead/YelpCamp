const express = require("express"),
      passport = require("passport"),
      User = require("../models/user");
      
const router = express.Router();

//show register form
router.get("/register", function(req, res){
    res.render("register");
});

// handle signup logic
router.post("/register", function(req, res){
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
    res.redirect("/campgrounds");
});

// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;