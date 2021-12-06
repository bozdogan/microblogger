const Post = require("./models/post");

const defineRoutes = function(app) {
    
    app.get("/", (req, res) => {
        res.render("index")
    });

    app.get("/posts", async (req, res) => {
        const posts = await Post.find({});
        res.render("posts/list", { posts });
    });
    
    app.get("/post/:id", async (req, res) => {
        const postId = req.params.id;
        const post = await Post.findById(postId);
    
        res.render("posts/detailview", { post });
    });

    app.get("/send", (req, res) => {
        res.render("posts/send")
    });

    app.post("/send", async (req, res) => {
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

    app.post("/editpost/:id", async (req, res) => {
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

    app.get("/deletepost/:id", async (req, res) => {
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
}

module.exports = defineRoutes;
