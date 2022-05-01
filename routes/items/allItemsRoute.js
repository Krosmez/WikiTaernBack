const express = require("express");
const items = require("../../models/itemsModel");

const allItemsRoute = express.Router();

// List all items
allItemsRoute.get('/all', async (_, res) => {
    items.find({}).then(
        (data) => {
            res.status(200).json(data);
        }
    ).catch(
        (err) => {
            console.log(err)
            res.status(400).json({ message: err });
        }
    )
});

// delete an item by ID
allItemsRoute.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await items.deleteOne({ _id: id });
    res.status(204).send();
});

module.exports = allItemsRoute;