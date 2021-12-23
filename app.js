const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");

const detectSession = require("./middlewares/detect-session");

const accountRoutes = require("./routes/account");
const indexRoutes = require("./routes/index");
const postRoutes = require("./routes/post");

mongoose.connect("mongodb://127.0.0.1:27017/wallposter")
.then(() => {
    console.log("MONGO OK")
})
.catch(err => {
    console.log("DATABASE CONNECTION ERROR");
    console.log(err);
});


const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(session({
    secret: "itsnotasecret",
    resave: false,
    saveUninitialized: false
}));

app.use(detectSession);

app.use("/", indexRoutes);
app.use("/posts", postRoutes);
app.use("/account", accountRoutes);

app.listen(3001, () => {
    console.log("LISTENING ON 3001");
});
