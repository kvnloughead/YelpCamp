// * For testing:  user=admin, password=pwd 

const express        = require("express"),
      app            = express(),
      request        = require("request"),
      mongoose       = require("mongoose"),
      passport       = require("passport"),
      LocalStrategy  = require("passport-local"),
      bodyParser     = require("body-parser"),
      Campground     = require("./models/campground"),
      methodOverride = require("method-override"),
      Comment        = require("./models/comment"),
      User           = require("./models/user"),
      seedDB         = require("./seeds");

// requiring routes
const commentRoutes     = require("./routes/comments"),
      campgroundRoutes  = require("./routes/campgrounds"),
      indexRoutes       = require("./routes/index");

// seed database
// seedDB();

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useUnifiedTopology: true,
    useNewUrlParser: true
}); 

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

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

app.get("/", function(req, res){
    res.render("landing");
}); 


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function(){
    console.log("Serving YelpCamp at port 3000...")
});