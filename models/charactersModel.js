const mongoose = require("mongoose");

const characters = mongoose.model(
    "Characters",
    new mongoose.Schema(
        {
            "_id": ObjectId,
            "name": String,
            "position": String,
            "isPNJ": {
                "isStatic": Boolean,
                "isFlying": Boolean,
                "quest": {
                    "daily": Boolean,
                    "task": Boolean
                },
                "trades": [
                    {
                        "_id": ObjectId,
                        "matId": ObjectId,
                        "obtainedMaterial": String,
                        "obtainedWith": [
                            {
                                "_id": ObjectId,
                                "name": String,
                                "qty": Number
                            }
                        ]
                    }
                ]
            },
            "isMob": {
                "isNormal": Boolean,
                "isChampion": Boolean,
                "isBoss": Boolean,
                "loot": {
                    "ressources": [
                        {
                            "_id": ObjectId,
                            "name": String,
                            "position": String
                        }
                    ],
                    "items": {
                        "isEpic": Boolean,
                        "isSet": [
                            {
                                "_id": ObjectId,
                                "name":String,
                                "rarity": String,
                                "effects": [
                                    {
                                        "_id": ObjectId,
                                        "name": String,
                                        "qty": Number,
                                        "description": String
                                    }
                                ]
                            }
                        ],
                        "isRare": [
                            {
                                "_id": ObjectId,
                                "name": String,
                                "rarity": String,
                                "effects": [
                                    {
                                        "_id": ObjectId,
                                        "name": String,
                                        "qty": Number,
                                        "description": String
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        }

    )
);

module.exports = characters;