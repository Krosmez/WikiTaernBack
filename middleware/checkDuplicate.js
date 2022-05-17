const User = require("../models/userModel");
// Check Duplicate users
let checkDuplicate = (req, res, next) => {
    User.findOne({
        email: req.body.email
    })
        .exec((err, success) => {
            if (err) {
                res.status(500).send({ message: err })
                return;
            }
            if (success) {
                res.status(400).send({ message: "This user already exists" });
                return;
            }
            next();
        })
}

module.exports = checkDuplicate;