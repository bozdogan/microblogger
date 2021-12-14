const Account = require("../models/account");
const bcrypt = require("bcrypt");
const express = require("express");

const NUM_BCRYPT_ROUNDS = 12;  // NOTE(bora): I'll just hard code it now.


const router = express.Router();

router.get("/login", async (req, res) => {
    if(req.session.userId) {
        res.redirect("/posts");
        return;
    }
    res.render("account/login");
});

router.post("/login/apply", async (req, res) => {
    const { username, password } = req.body;
    console.log("Login: " + username);

    const user = await Account.findOne({ username });
    console.log(user);

    const checkSuccess = await bcrypt.compare(password, user.password);
    console.log(checkSuccess);

    if(checkSuccess) {
        req.session.userId = user._id;
        console.log(`User '${user.username}' is logged in.`);
    } else {
        console.log(`Failed login attempt with user '${user.username}'.`);
    }

    res.redirect("/login");
});

router.get("/signup", async (req, res) => {
    res.render("account/signup");
});

router.post("/signup/apply", async (req, res) => {
    console.log("Signup::");
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, NUM_BCRYPT_ROUNDS),
        date_created: new Date()
    };
    console.log(data);
    
    const account = new Account(data);
    await account.validate();

    const result = await account.save();
    console.log(result);

    if(result) {
        res.redirect("/posts");
    } else {
        res.redirect("/signup");
    }
});

module.exports = router;
