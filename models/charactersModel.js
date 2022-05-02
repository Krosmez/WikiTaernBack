const mongoose = require("mongoose");

const characters = mongoose.model(
    "Characters",
    new mongoose.Schema(
        {
            "name": String,
            "position": String,
            "is_pnj": Boolean,
            "is_mob": Boolean,
            "pnj": {
                "is_static": Boolean,
                "is_flying": Boolean,
                "quest": {
                    "daily": Boolean,
                    "task": Boolean
                },
                "trades": [
                    {
                        "mat_id": {type: mongoose.Schema.Types.ObjectId, ref:'items'},
                        "obtained_material": String,
                        "obtained_with": [
                            {
                                "name": String,
                                "qty": Number
                            }
                        ]
                    }
                ]
            },
            "mob": {
                "is_normal": Boolean,
                "is_champion": Boolean,
                "is_boss": Boolean,
                "loot": {
                    "ressources": [{ "name": String, "position": String }],
                    "items": {
                        "is_epic": Boolean,
                        "is_set": {
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
                        "is_rare": {
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