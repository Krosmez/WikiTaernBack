const mongoose = require("mongoose");

const items = mongoose.model(
    "Items",
    new mongoose.Schema(
        {
            "isStuff": {
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

            },
            "isMaterial": {
                "name": String,
                "value": Number,
                "weight": Number,
                "position": String,
                "utility": String,
                "isNatural": {
                    "extract_from": {
                        "position": String,
                        "qty": Number
                    },
                    "process_from": {
                        "position": String,
                        "qty": Number
                    },
                    "from_mob": {
                        "_id": mongoose.Types.ObjectId,
                        "name": String
                    }
                }
                ,
                "isFromPNJ": {
                    "buy_from": [
                        {
                            "trade_value": Number,
                            "currency": String,
                            "qty": Number
                        }
                    ],
                    "by_trade": {
                        "obtain_with": [
                            {
                                "name": String
                            }
                        ]
                    },
                    "tasks": [{ "qty": Number }]
                }
            }
        }
    )
);

module.exports = items;