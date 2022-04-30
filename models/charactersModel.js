const mongoose = require("mongoose");

const characters = mongoose.model(
    "Characters",
    new mongoose.Schema(
        {
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
                        "matId": {type: mongoose.Schema.Types.ObjectId, ref:'items'},
                        "obtainedMaterial": String,
                        "obtainedWith": [
                            {
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
                    "ressources": [{ "name": String, "position": String }],
                    "items": {
                        "isEpic": Boolean,
                        "isSet": {
                            "name": String,
                            "rarity": String,
                            "effects": [
                                {
                                    "name": String,
                                    "qty": Number,
                                    "description": String
                                }
                            ]
                        },
                        "isRare": {
                            "name": String,
                            "rarity": String,
                            "effects": [
                                {
                                    "name": String,
                                    "qty": Number,
                                    "description": String
                                }
                            ]
                        }
                    }
                }
            }
        }

    )
);

module.exports = characters;