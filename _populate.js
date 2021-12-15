/*
    NOTE(bora): This script populate the database for testing
*/

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


Post.insertMany([
    {
        message: "tbh, I believe Zack Snyder did nothing wrong. it's your own corruptness to say mean things to him!",
        author: "catmobile69",
        date_created: new Date(2021, 11, 29, 13, 22)
    },
    {
        message: "yes, he isn't the hero we need. but neither is he the hero we deserve",
        author: "eaglewarriorman",
        date_created: new Date(2021, 11, 29, 13, 45)
    },
    {
        message: "you suck bc you are male",
        author: "Karen",
        date_created: new Date(2021, 10, 03, 11, 56)
    },
    {
        message: "oh shut up karen you suck big time!",
        author: "imieinazwisko",
        date_created: new Date(2021, 10, 03, 12, 01)
    },
    {
        message: "This is good!",
        author: "soyturco",
        date_created: new Date(2021, 12, 05, 17, 42)
    },
])
.then(() => {
    console.log("Posts inserted.")
})
.catch(err => {
    console.log(err)
});