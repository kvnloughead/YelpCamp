const express = require("express");
const app = express();
const request = require("request");


app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    let campgrounds = [
        {name: "Camp Yogi", image: "https://images.unsplash.com/photo-1532720401185-3c5adeba363c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
        {name: "Hooverville", image: "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
        {name: "Never-Never Land", image: "https://images.unsplash.com/photo-1546890975-7596e98cdbf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
    ]
    res.render("campgrounds", {campgrounds: campgrounds})
});

app.listen(3000, function(){
    console.log("Serving YelpCamp at port 3000...")
});