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

router.get("/posts/new", async (req, res) => {
    if(req.session.userId) {
        res.render("posts/send", {user: await Account.findById(req.session.userId)});
    } else {
        res.redirect("/login");
    }
});

router.post("/posts", async (req, res) => {
    console.log(req.body);
    if(req.session.userId) {
        const user = await Account.findById(req.session.userId);
        const post = await new Post({
            author: user.username,
            message: req.body.message,
            date_created: new Date()
        }).save();
        
        if(post) {
            res.redirect("/posts");
        } else {
            res.redirect("/posts/new");
        }
    } else {
        res.redirect("/login");
    }
});

router.get("/posts/:id", async (req, res) => {
    const postId = req.params.id;
    const data = { post: await Post.findById(postId) };
    if(req.session.userId) {
        data.user = await Account.findById(req.session.userId);
    }

    res.render("posts/view", data);
});

router.get("/posts/:id/edit", async (req, res) => {
    const postId = req.params.id;
    if(req.session.userId) {
        const post = await Post.findById(postId);
        const activeUser = await Account.findById(req.session.userId);
        if(activeUser.username === post.author) {
            res.render("posts/edit", { post });
            return;
        }
    }

    res.send("<!DOCTYPE html><head><title>Forbidden</title></head><body><h1>You cannot edit this post</h1></body></html>");
});

router.patch("/posts/:id", async (req, res) => {
    const postId = req.params.id;
    
    console.log(`UPDATE requested on post #${postId}`);
    console.log("The post: " + await Post.findById(postId));
    console.log("\nThe requested replacement:");
    console.log(req.body);

    const result = await Post.updateOne({_id: postId}, req.body);
    if(result.modifiedCount > 0) {
        console.log("Saved successfully.")
    }

    res.redirect('/posts');
});

router.delete("/posts/:id", async (req, res) => {
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
