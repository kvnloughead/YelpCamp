const mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    author: {
        username: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"     //reference to our User model 
        }
    }
});

module.exports = mongoose.model("Comment", commentSchema);