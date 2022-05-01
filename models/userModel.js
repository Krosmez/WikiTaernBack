const mongoose = require("mongoose");

const user = mongoose.model(
    "User",
    new mongoose.Schema(
        {
            email: String,
            password: String
        }
    )
);

module.exports = user;