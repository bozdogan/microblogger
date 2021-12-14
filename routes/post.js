const Account = require("../models/account");
const Post = require("../models/post");
const express = require("express");


const router = express.Router();

router.get("/posts", async (req, res) => {
    const posts = await Post.find({});
    const data = { posts };
    if(req.session.userId) {
        const user = await Account.findById(req.session.userId);
        console.log("Session found. Username: " + user.username);
        data.user = user;
    }

    res.render("posts/index", data);
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

module.exports = router;
