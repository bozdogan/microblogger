/*
    NOTE(bora): This script populate the database for testing
*/

const mongoose = require("mongoose");
const Post = require("./models/post");
const Account = require("./models/account");

const DATABASE_URL = "mongodb://127.0.0.1:27017/wallposter";

const populateDatabase = async function() {

    try {
        await Account.insertMany([
            {
                username: "root",
                email: "root@tardis.who",
                password: "$2b$12$Thsf1qC2cbtbYl53K0uS6.1hQK6THQ122dZ2JzI.6vy1yI5G/N6f6",
                date_created: new Date(2021, 11, 14, 22, 36, 43)
            },
            {
                username: "bora",
                email: "b@ozdogan.org",
                password: "$2b$12$zLjQhOCOWtB52t28Xcj0yuHVekk3DI2Gytng/Kicc/wm27fUyZ/fq",
                date_created: new Date(2021, 11, 14, 22, 38, 25)
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
            {
                username: "G??l",
                email: "yumurcak@gmail.com",
                password: "$2b$12$ckX2YxgZFhczhsmIECJ.Xuxh09Tbj3A7Tznkiv0QqF8Uak2koV8/i",
                date_created: new Date("2021-12-23T13:26:14.495Z")
            },
        ]);
        console.log("Accounts added.");

        const findIdByName = async function(accountId) {
            try {
                return (await Account.findOne({username: accountId}))["_id"];
            } catch(e) {
                console.log("Error while fetching id ", e);
                return null;
            }
        };

        await Post.insertMany([
            {
                message: "tbh, I believe Zack Snyder did nothing wrong. it's your own corruptness to say mean things to him!",
                author: await findIdByName("catmobile69"),
                date_created: new Date(2021, 10, 29, 13, 22)
            },
            {
                message: "yes, he isn't the hero we need. but neither is he the hero we deserve",
                author: await findIdByName("eaglewarriorman"),
                date_created: new Date(2021, 10, 29, 13, 45)
            },
            {
                message: "this is a wonderful day",
                author: await findIdByName("Karen"),
                date_created: new Date(2021, 09, 03, 11, 56)
            },
            {
                message: "yeah Karen, you are absolutely right!",
                author: await findIdByName("imieinazwisko"),
                date_created: new Date(2021, 09, 03, 12, 01)
            },
            {
                message: "TH??S ??S GOOD.",
                author: await findIdByName("soyturco"),
                date_created: new Date(2021, 10, 05, 17, 42)
            },
            {
                message: "??ncellikle kestane bal??n??n diyar?? Zonguldak G??k??ebey, Hazano??lu k??y??nden t??m d??nyaya selam olsun.",
                author: await findIdByName("newcomer"),
                date_created: new Date(2021, 10, 06, 15, 31, 02)
            },
            {
                message: "My unpopular opinion: The Last Jedi is the BEST MOVIE EVA!!1!",
                author: await findIdByName("author"),
                date_created: new Date(2021, 11, 06, 13, 34, 31)
            },
            {
                message: "Die with memories but not dreams",
                author: await findIdByName("G??l"),
                date_created: new Date("2021-12-23T13:29:55.788Z")
            },
            {
                message: "just setting up my wall pstr",
                author: await findIdByName("bora"),
                date_created: new Date("2021-12-23T13:35:49.534Z")
            }
        ]);
        console.log("Posts inserted.");
    } catch(err) {
        console.log(err);
    }
};

(async function() {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log("MONGO OK");
    } catch(err) {
        console.log("\nDB ERROR\n");
        console.log(err);
        process.exit(1);
    }

    if(process.argv[2] === "--nuke") {
        console.log("Nuking collections...\n");
        await Account.deleteMany({});
        await Post.deleteMany({});
    }

    await populateDatabase();

    mongoose.disconnect();
    console.log("\nDONE");
})();
