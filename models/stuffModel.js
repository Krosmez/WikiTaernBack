const mongoose = require("mongoose");

const stuffs = mongoose.model(
    "Stuffs",
    new mongoose.Schema(
        {
            "name": String,
            "value": Number,
            "weight": Number,
            "rarity": String,
            "isFor": String,
            "stats": [{ "name": String, "value": Number }],
            "effects": [{ "name": String, "value": Number }],
            'isPartOfSet': {
                "name": String,
                "effects": [{ "name": String, "value": Number, "description": String }],
                "with": [{ "name": String }]

            }
        }
    )
);

module.exports = stuffs;