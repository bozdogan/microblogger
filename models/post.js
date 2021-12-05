const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date_created: {
        type: Date
    }
});


const Post = mongoose.model("Post", postSchema);
module.exports = Post;
