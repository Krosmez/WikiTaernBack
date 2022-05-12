const express = require("express");
const items = require("../../models/itemsModel");

const stuffsRoute = express.Router();

stuffsRoute.get('/', async (_, res) => {
    await items.find({
        is_stuff: {
            $eq: true
        }
    }, 'name value weight stuff')
        .then(
            (data) => {
                res.status(202).json(data);
            })
        .catch((err) => { res.status(500).json({ message: err }) });
});

stuffsRoute.post('/', async (req, res) => {
    const { name, value, weight, stuff, material } = req.body;

    const newStuff = new items({
        name,
        value,
        weight,
        "is_stuff":true,
        "is_material":false,
        stuff,
        material
    });

    await newStuff.save((err, result) => {
        if (err) { res.status(500).send({ message: err }) };
        res.json({
            result
        });
    });
});

stuffsRoute.get('/:id', async (req, res) => {
    const { id } = req.params;
    await items.find({
        $and: [
            { id },
            {
                is_stuff: {
                    $eq: true
                }
            }
        ]
    }, 'name value weight stuff')
        .then(
            (data) => {
                res.status(202).json(data);
            })
        .catch((err) => { res.status(500).json({ message: err }) });
});

module.exports = stuffsRoute;