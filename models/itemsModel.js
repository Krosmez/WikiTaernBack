const mongoose = require("mongoose");

const items = mongoose.model(
    "Items",
    new mongoose.Schema(
        {
            "name": String,
            "value": Number,
            "weight": Number,
            "is_stuff":Boolean,
            "is_material":Boolean,
            "stuff": {
                "rarity": String,
                "is_for": String,
                "stats": [{ "name": String, "value": Number }],
                "effects": [{ "name": String, "value": Number }],
                'part_of_set': {
                    "name": String,
                    "effects": [{ "name": String, "value": Number, "description": String }],
                    "with": [{ "name": String }]
                }
            },
            "material": {
                "position": String,
                "utility": String,
                "natural": {
                    "extract_from": {
                        "position": String,
                        "qty": Number
                    },
                    "process_from": {
                        "position": String,
                        "qty": Number
                    },
                    "from_mob": {
                        "mob_id": { type: mongoose.Schema.Types.ObjectId, ref: 'characters' },
                        "name": String
                    }
                },
                "from_pnj": {
                    "pnjId": { type: mongoose.Schema.Types.ObjectId, ref: 'characters' },
                    "buy_from": [
                        {
                            "pnj_id": { type: mongoose.Schema.Types.ObjectId, ref: 'characters' },
                            "trade_value": Number,
                            "currency": String,
                            "qty": Number
                        }
                    ],
                    "by_trade": {
                        "obtain_with": [
                            {
                                "pnjId": { type: mongoose.Schema.Types.ObjectId, ref: 'characters' },
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