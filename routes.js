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
        const { id: postId } = req.params;
        const post = await Post.findById(postId);
    
        res.render("posts/viewsingle", { post });
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
        
        if(post)
            res.redirect("/posts");
        else
            res.redirect("/send");
    });
}

module.exports = defineRoutes;
