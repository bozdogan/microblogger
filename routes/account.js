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
    console.log(`'${username}' is logging in...`);

    const user = await Account.findAndAuthenticate(username, password);
    if(user) {
        console.log(user);
        req.session.userId = user._id;
        console.log(`User '${user.username}' is logged in.`);
    } else {
        console.log(`Failed login attempt with username '${username}'.`);
    }

    res.redirect("/account/login");
});

router.get("/logout", async (req, res) => {
    if(req.session.userId) {
        const user = req.activeAccount;
        req.session.destroy();
        console.log(`'${user.username}' logged out.`);
    }
    res.redirect("/");
});

router.get("/signup", async (req, res) => {
    if(req.session.userId) {
        res.redirect("/posts");
    } else {
        res.render("account/signup");
    }
});

router.post("/signup/apply", async (req, res) => {
    const { username, email, password } = req.body;
    const date_created = new Date();
    
    const account = new Account({ username, email, password, date_created });
    await account.validate();
    
    const result = await account.save();
    if(result) {
        console.log(`New user signed up: ${username}`);
        req.session.userId = account._id;
        res.redirect("/posts");
    } else {
        res.redirect("/account/signup");
    }
});

module.exports = router;
