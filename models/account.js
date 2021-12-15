const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const NUM_BCRYPT_ROUNDS = 12;  // NOTE(bora): I'll just hard code it now.


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

accountSchema.statics.findAndAuthenticate =
async function(username, password) {
    const user = await this.findOne({ username });
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
}

// NOTE(bora): Mongoose middleware to hash passwords on save
accountSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, NUM_BCRYPT_ROUNDS);
    next();
});

module.exports = mongoose.model("Account", accountSchema);
