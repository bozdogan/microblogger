const Account = require("../models/account");
const bcrypt = require("bcrypt");
const express = require("express");


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
    console.log(`'${username}' logged in.`);

    const user = await Account.findAndAuthenticate(username, password);
    if(user) {
        req.session.userId = user._id;
        console.log(`User '${user.username}' is logged in.`);
    } else {
        console.log(`Failed login attempt with user '${user.username}'.`);
    }

    res.redirect("/login");
});

router.get("/logout", async (req, res) => {
    if(req.session.userId) {
        const user = await Account.findById(req.session.userId);
        req.session.destroy();
        console.log(`'${user.username}' logged out.`);
    }
    res.redirect("/");
});

router.get("/signup", async (req, res) => {
    res.render("account/signup");
});

router.post("/signup/apply", async (req, res) => {
    const { username, email, password } = req.body;
    const date_created = new Date();
    
    const account = new Account({ username, email, password, date_created });
    await account.validate();
    
    const result = await account.save();
    if(result) {
        console.log(`New user signed up: ${username}`);
        res.redirect("/posts");
    } else {
        res.redirect("/signup");
    }
});

module.exports = router;
