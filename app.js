const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const defineRoutes = require("./routes");

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

defineRoutes(app);

app.listen(3001, () => {
    console.log("LISTENING ON 3001");
});
