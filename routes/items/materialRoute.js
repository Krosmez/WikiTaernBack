const express = require("express");
const materials = require("../../models/materialsModel");

const materialsRoute = express.Router();

// Create a new item as Material
materialsRoute.post('/material', async (req, res) => {
    const { name, value, weight, position, utility, isNatural, isFromPNJ } = req.body;
    // create a new item
    const newMaterial = new materials({
        name,
        value,
        weight,
        position,
        utility,
        isNatural,
        isFromPNJ
    });

    newMaterial.save((err, result) => {
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

materialsRoute.put('/material/:id', async (req, res) => {
    const { id } = req.params;
    const { name, value, weight, position, utility, isNatural, isFromPNJ } = req.body;

    const body = {
        name,
        value,
        weight,
        position,
        utility,
        isNatural,
        isFromPNJ
    };

    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        });
        return;
    };

    await materials.findOneAndUpdate({ _id: id }, body, (error, res) => {
        if (error) {
            res.status(500);
            return;
        } else {
            res.status(200);
        }
    });
    res.send();
});

module.exports = materialsRoute;