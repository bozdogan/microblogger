const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username cannot be blank"]
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, "Password cannot be blank"]
    },
    date_created: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Account", accountSchema);
