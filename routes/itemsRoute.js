const express = require("express");
const items = require("../models/itemsModel");

const itemsRouter = express.Router();

// List all items
itemsRouter.get('/all', async (_, res) => {
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
})

// Create a new item as Stuff
itemsRouter.post('/stuff', async (req, res) => {
    const { name, value, weight, rarity, isFor, stats, effects, isPartOfSet } = req.body;
    // create a new item
    const newItem = new items({
        "isStuff": {
            name,
            value,
            weight,
            rarity,
            isFor,
            stats,
            effects,
            isPartOfSet
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
})

// Create a new item as Material
itemsRouter.post('/material', async (req, res) => {
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
})

itemsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await items.deleteOne({ _id: id });
    res.status(204).send();
})

module.exports = itemsRouter;