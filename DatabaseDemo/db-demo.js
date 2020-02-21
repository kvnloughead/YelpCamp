// get things set up
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/some_db"); 

// create Schema(s).  These are patterns for our data, consisting of attributes that all objs in db should share
var objectSchema = new mongoose.Schema({
    name: String,
    attr1: Number,
    attr2: String
});

// make a model object from objSchema for an OOP interface to our data. 
// naming convention: should be singular, and collection will be its plural 
var Object = mongoose.model("Object", objectSchema)

//add new object to database
// var obj = new Object({
//     name: "Some thing",
//     attr1: 31,
//     attr2: "some attribute"
// });

// obj.save(function(err, object){ // callback function is optional, gets called regardless of successful saving
//     if(err){
//         console.log("Something went wrong")
//     } else {
//         console.log("Saved the following object to database:");
//         console.log(object);
//     }
// });

Object.create({ // makes new obj and saves it to db in one step
    name: "foo",
    attr1: 7,
    attr2: "bar"
}, function(err, object){
    if(err){
        console.log("Error:");
        console.log(err);
    } else {
        console.log("Added to db: ");
        console.log(object);
    }
});

//retrieve all objects from db and console.log each
Object.find({}, function(err, foundStuff){
    // first parameter of find is empty object, indicating find all
    if(err){
        console.log("An error has occured:");
        console.log(err);
    } else {
        console.log("Stuff we found:")
        console.log(foundStuff);
    }

})