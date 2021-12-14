const Account = require("./models/account");
const Post = require("./models/post");
const express = require("express");
const bcrypt = require("bcrypt");

const NUM_BCRYPT_ROUNDS = 12;  // NOTE(bora): I'll just hard code it now.


const router = express.Router();

router.get("/", (req, res) => {
    res.render("index")
});

router.get("/posts", async (req, res) => {
    const posts = await Post.find({});
    res.render("posts/index", { posts });
});

router.get("/post/:id", async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    res.render("posts/view", { post });
});

router.get("/posts/send", (req, res) => {
    res.render("posts/send")
});

router.post("/posts/send", async (req, res) => {
    console.log(req.body);

    const post = await new Post({
        author: req.body.author,
        message: req.body.message,
        date_created: new Date()
    }).save();
    
    if(post) {
        res.redirect("/posts");
    } else {
        res.redirect("/send");
    }
});

router.post("/post/:id/update", async (req, res) => {
    const postId = req.params.id;
    
    console.log(`UPDATE requested on post #${postId}`);
    console.log("The post: " + await Post.findById(postId));
    console.log("\nThe requested replacement:");
    console.log(req.body);

    const result = await Post.updateOne({_id: postId}, req.body);
    if(result.modifiedCount > 0) {
        console.log("Saved successfully.")
    }

    res.redirect('back');
});

router.get("/post/:id/delete", async (req, res) => {
    const postId = req.params.id;

    console.log(`DELETE requested on post #${postId}`);
    console.log("The post: " + await Post.findById(postId));

    const result = await Post.deleteOne({_id: postId});
    if(result.deletedCount > 0) {
        console.log("Deleted successfully.");
        res.redirect('/posts');
    } else {
        res.redirect('back');
    }
});

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
