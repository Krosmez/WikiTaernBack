const express = require("express");
const items = require("../../models/itemsModel");

const itemsRouter = express.Router();

itemsRouter.get('/stuff/all', async (req, res) => {
    items.find({ isStuff: {} })
        .exec()
        .then(
            (data) => {
                res.status(200).json(data);
            }
        ).catch(
            (err) => {
                res.status(500).json({ message: err })
            }
        )


})

// itemsRouter.get('/stuff/:id', async (req, res) => {
//     const { id } = req.params;


// })


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
        },
        "isMaterial": false
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

itemsRouter.put('/stuff/:id', async (req, res) => {
    const { id } = req.params;
    const { name, value, weight, rarity, isFor, stats, effects, isPartOfSet } = req.body;

    const body = {
        name,
        value,
        weight,
        rarity,
        isFor,
        stats,
        effects,
        isPartOfSet
    };

    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        });
        return;
    };

    await items.findOneAndUpdate({ _id: id }, body, (error, res) => {
        if (error) {
            res.status(500);
            return;
        } else {
            res.status(200);
        }
    });
    res.send();
});

module.exports = itemsRouter;