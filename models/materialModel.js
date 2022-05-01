const mongoose = require("mongoose");

const materials = mongoose.model(
    "Materials",
    new mongoose.Schema(
        {
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
                    "mobId": { type: mongoose.Schema.Types.ObjectId, ref: 'characters' },
                    "name": String
                }
            }
            ,
            "isFromPNJ": {
                "pnjId": { type: mongoose.Schema.Types.ObjectId, ref: 'characters' },
                "buy_from": [
                    {
                        "pnjId": { type: mongoose.Schema.Types.ObjectId, ref: 'characters' },
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
    )
);

module.exports = materials;