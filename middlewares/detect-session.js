const Account = require("../models/account");

module.exports = async (req, res, next) => {
    if(req.session.userId) {
        req.activeAccount = await Account.findById(req.session.userId);
        console.log(`Active user: ${req.activeAccount.username} (${req.session.userId})`);
    }
    
    next();
};
