const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const Post = require("./models/post");

mongoose.connect("mongodb://127.0.0.1:27017/wallposter")
.then(() => {
    console.log("MONGO OK")
})
.catch(err => {
    console.log("AH FUCK! I CAN'T BELIEVE YOU'VE DONE THIS.");
    console.log(err);
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "static")));

app.get("/posts", async (req, res) => {
    const posts = await Post.find({});
    console.log(posts);
    res.render("posts/index", {posts});
});


app.listen(3001, () => {
    console.log("LISTENING ON 3001");
});