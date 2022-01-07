const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    date_created: {
        type: Date
    }
});

module.exports = mongoose.model("Post", postSchema);
