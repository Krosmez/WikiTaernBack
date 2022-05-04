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
                res.status(200).json(data);
            })
        .catch((err) => { res.status(500).json({ message: err }) });
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
                res.status(200).json(data);
            })
        .catch((err) => { res.status(500).json({ message: err }) });
});

module.exports = stuffsRoute;