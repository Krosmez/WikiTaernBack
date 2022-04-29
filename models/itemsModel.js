const mongoose = require("mongoose");

const items = mongoose.model(
    "Items",
    new mongoose.Schema(
        {
            "_id": ObjectId,
            "name": String,
            "value": Number,
            "weight": Number,
            "isStuff": [
                {
                    "isStuff": Boolean,
                    "rarity": String,
                    "isFor": String,
                    "stats": [
                        {
                            "name": String,
                            "value": Number
                        }
                    ],
                    "effects": [
                        {
                            "_id": ObjectId,
                            "name": String,
                            "value": Number,
                            'description': String
                        }
                    ],
                    'isPartOfSet': {
                        "_id": ObjectId,
                        "name": String,
                        "effects": [
                            {
                                "_id": ObjectId,
                                "name": String,
                                "value": Number,
                                'description': String
                            }
                        ],
                        "with": [
                            {
                                "_id": ObjectId,
                                "name": String
                            }
                        ]
                    }

                }
            ],
            "isMaterial": [
                {
                    "position": String,
                    "utility": String,
                    "isNatural": [
                        {
                            "extract_from": {
                                "position": String,
                                "qty": Number
                            },
                            "process": {
                                "position": String,
                                "qty": Number
                            },
                            "from_mob": [
                                {
                                    "_id": ObjectId,
                                    "name": String
                                }
                            ]
                        }
                    ],
                    "isFromPNJ": [
                        {
                            "buy_from": [
                                {
                                    "_id": ObjectId,
                                    "trade_value": Number,
                                    "currency": String,
                                    "qty": Number
                                }
                            ],
                            "trade_with": [
                                {
                                    "_id": ObjectId,
                                    "obtain with": [
                                        {
                                            "_id": ObjectId,
                                            "name": String
                                        }
                                    ]
                                }
                            ],
                            "tasks": [
                                {
                                    "pnjId": ObjectId,
                                    "qty": Number
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    )
);

module.exports = items;