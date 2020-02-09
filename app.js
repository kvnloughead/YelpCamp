const express = require("express");
const app = express();
const request = require("request");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("landing");
});

var campgrounds = [
    {name: "Camp Yogi", image: "https://images.unsplash.com/photo-1532720401185-3c5adeba363c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name: "Hooverville", image: "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name: "Never-Never Land", image: "https://images.unsplash.com/photo-1546890975-7596e98cdbf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
]

// main campgrounds page
app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds})
});

// POST new campground
app.post("/campgrounds", function(req, res) {
    // add new campground to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect to campgrounds (used GET by default)
    res.redirect("/campgrounds");

});

// form for new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.listen(3000, function(){
    console.log("Serving YelpCamp at port 3000...")
});