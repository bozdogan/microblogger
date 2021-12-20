/*
    NOTE(bora): This script populate the database for testing
*/

const mongoose = require("mongoose");
const Post = require("./models/post");
const Account = require("./models/account");

const DATABASE_URL = "mongodb://127.0.0.1:27017/wallposter";

const populateDatabase = async function() {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log("MONGO OK");
    } catch(err) {
        console.log("AH FUCK! I CAN'T BELIEVE YOU'VE DONE THIS.");
        console.log(err);
    }

    try {
        await Post.insertMany([
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
                message: "you suck bc you eat meat",
                author: "Karen",
                date_created: new Date(2021, 10, 03, 11, 56)
            },
            {
                message: "oh shut up karen you suck big time!",
                author: "imieinazwisko",
                date_created: new Date(2021, 10, 03, 12, 01)
            },
            {
                message: "THİS İS GOOD.",
                author: "soyturco",
                date_created: new Date(2021, 12, 05, 17, 42)
            },
            {
                message: "Öncellikle kestane balının diyarı Zonguldak Gökçebey, Hazanoğlu köyünden tüm dünyaya selam olsun.",
                author: "newcomer",
                date_created: new Date(2021, 12, 06, 15, 31, 02)
            },
            {
                message: "My unpopular opinion: The Last Jedi is the BEST MOVIE EVA!!1!",
                author: "author",
                date_created: new Date(2021, 12, 06, 13, 34, 31)
            },
        ]);
        console.log("Posts inserted.");

        await Account.insertMany([
            {
                username: "root",
                email: "root@tardis.who",
                password: "$2b$12$Thsf1qC2cbtbYl53K0uS6.1hQK6THQ122dZ2JzI.6vy1yI5G/N6f6",
                date_created: new Date(2021, 12, 14, 22, 36, 43)
            },
            {
                username: "bora",
                email: "b@ozdogan.org",
                password: "$2b$12$zLjQhOCOWtB52t28Xcj0yuHVekk3DI2Gytng/Kicc/wm27fUyZ/fq",
                date_created: new Date(2021, 12, 14, 22, 38, 25)
            },
            {
                username: "catmobile69",
                email: "N/A",
                password: "$2b$12$fsZNrGmvfPzGLxHTBh.zxu30nDfjbbGToY0WYINEP1tpaaptZLDpm",
                date_created: "2021-10-03"
            },
            {
                username: "eaglewarriorman",
                email: "N/A",
                password: "$2b$12$fsZNrGmvfPzGLxHTBh.zxu30nDfjbbGToY0WYINEP1tpaaptZLDpm",
                date_created: "2021-10-03"
            },
            {
                username: "Karen",
                email: "N/A",
                password: "$2b$12$fsZNrGmvfPzGLxHTBh.zxu30nDfjbbGToY0WYINEP1tpaaptZLDpm",
                date_created: "2021-10-03"
            },
            {
                username: "newcomer",
                email: "N/A",
                password: "$2b$12$fsZNrGmvfPzGLxHTBh.zxu30nDfjbbGToY0WYINEP1tpaaptZLDpm",
                date_created: "2021-10-03"
            },
            {
                username: "imieinazwisko",
                email: "N/A",
                password: "$2b$12$fsZNrGmvfPzGLxHTBh.zxu30nDfjbbGToY0WYINEP1tpaaptZLDpm",
                date_created: "2021-10-03"
            },
            {
                username: "soyturco",
                email: "N/A",
                password: "$2b$12$fsZNrGmvfPzGLxHTBh.zxu30nDfjbbGToY0WYINEP1tpaaptZLDpm",
                date_created: "2021-10-03"
            },
            {
                username: "author",
                email: "N/A",
                password: "$2b$12$fsZNrGmvfPzGLxHTBh.zxu30nDfjbbGToY0WYINEP1tpaaptZLDpm",
                date_created: "2021-11-23"
            },
        ]);
        console.log("Accounts added.");  

        mongoose.disconnect();
        console.log("DONE");          
    } catch(err) {
        console.log(err);
    }
}


populateDatabase();
