const Account = require("../models/account");
const Post = require("../models/post");
const express = require("express");


const router = express.Router();

router.get("/", async (req, res) => {
    const posts = await Post.find({}).sort({ date_created: -1 }).populate("author");
    res.render("posts/index", { posts, user: req.activeAccount });
});

router.get("/new", async (req, res) => {
    if(req.session.userId) {
        res.render("posts/send", {user: req.activeAccount});
    } else {
        res.redirect("/account/login");
    }
});

router.post("/", async (req, res) => {
    console.log(req.body);
    if(req.session.userId) {
        const post = await new Post({
            author: req.activeAccount.username,
            message: req.body.message,
            date_created: new Date()
        }).save();
        
        if(post) {
            res.redirect("/posts");
        } else {
            // TODO(bora): Tell user that the post didn't make it.
            res.redirect("/posts/new");
        }
    } else {
        res.redirect("/account/login");
    }
});

router.get("/:id", async (req, res) => {
    const postId = req.params.id;
    const data = { post: await Post.findById(postId).populate("author") };
    if(req.session.userId) {
        data.user = req.activeAccount;
    }

    res.render("posts/view", data);
});

router.get("/:id/edit", async (req, res) => {
    const postId = req.params.id;
    if(req.session.userId) {
        const post = await Post.findById(postId).populate("author");
        const activeUser = req.activeAccount;
        if(activeUser.username === post.author) {
            res.render("posts/edit", { post, user: req.activeAccount});
            return;
        }
    }

    // TODO(bora): Turn that to a template.
    res.send("<!DOCTYPE html><head><title>Forbidden</title></head><body><h1>You cannot edit this post</h1></body></html>");
});

router.patch("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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
