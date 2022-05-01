const express = require("express");
const items = require("../../models/itemsModel");

const materialsRoute = express.Router();

// Create a new item as Material
materialsRoute.post('/material', async (req, res) => {
    const { name, value, weight, position, utility, isNatural, isFromPNJ } = req.body;
    // create a new item
    const newItem = new items({
        "isStuff": false,
        "isMaterial": {
            name,
            value,
            weight,
            position,
            utility,
            isNatural,
            isFromPNJ
        }
    });

    newItem.save((err, result) => {
        if (err) {
            res.status(500).send(
                {
                    message: err
                }
            )
            return;
        }
        res.status(200).json({ result })
    })
});

module.exports = materialsRoute;