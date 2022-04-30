const mongoose = require("mongoose");

const items = mongoose.model(
    "Items",
    new mongoose.Schema(
        {
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

                            "name": String,
                            "value": Number,
                            'description': String
                        }
                    ],
                    'isPartOfSet': {

                        "name": String,
                        "effects": [
                            {

                                "name": String,
                                "value": Number,
                                'description': String
                            }
                        ],
                        "with": [
                            {
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

                                    "name": String
                                }
                            ]
                        }
                    ],
                    "isFromPNJ": [
                        {
                            "buy_from": [
                                {

                                    "trade_value": Number,
                                    "currency": String,
                                    "qty": Number
                                }
                            ],
                            "trade_with": [
                                {

                                    "obtain with": [
                                        {

                                            "name": String
                                        }
                                    ]
                                }
                            ],
                            "tasks": [
                                {
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