const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {user: req.activeAccount})
});

module.exports = router;
