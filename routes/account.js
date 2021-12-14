const Account = require("../models/account");
const bcrypt = require("bcrypt");
const express = require("express");

const NUM_BCRYPT_ROUNDS = 12;  // NOTE(bora): I'll just hard code it now.


const router = express.Router();

router.get("/login", async (req, res) => {
    res.render("account/login");
});

router.post("/login/apply", async (req, res) => {
    console.log("Login: ");
    console.log(req.body);

    const result = await Account.findOne({
        username: req.body.username
    });
    console.log(result);

    const checkSuccess = await bcrypt.compare(req.body.password, result.password);
    console.log(checkSuccess);

    if(checkSuccess) {
        res.send("HELLO " + result.username);

    } else {
        res.redirect("/signup");
    }
});

router.get("/signup", async (req, res) => {
    res.render("account/signup");
});

router.post("/signup/apply", async (req, res) => {
    console.log("Signup: ");
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, NUM_BCRYPT_ROUNDS),
        date_created: new Date()};
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
