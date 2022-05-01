const express = require("express");
const stuffs = require("../../models/stuffModel");

const stuffsRouter = express.Router();

stuffsRouter.get('/stuff', async (_, res) => {
    stuffs.find({}).then(
        (data) => {
            res.status(200).json(data);
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: err });
        }
    );
});

stuffsRouter.get('/stuff/all', async (req, res) => {
    stuffs.find({ isStuff: {} })
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

// stuffsRouter.get('/stuff/:id', async (req, res) => {
//     const { id } = req.params;


// })


// Create a new item as Stuff
stuffsRouter.post('/stuff', async (req, res) => {
    const { name, value, weight, rarity, isFor, stats, effects, isPartOfSet } = req.body;
    // create a new item
    const newStuff = new stuffs({
        name,
        value,
        weight,
        rarity,
        isFor,
        stats,
        effects,
        isPartOfSet
    });

    newStuff.save((err, result) => {
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

stuffsRouter.put('/stuff/:id', async (req, res) => {
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

    await stuffs.findOneAndUpdate({ _id: id }, body, (error, res) => {
        if (error) {
            res.status(500);
            return;
        } else {
            res.status(200);
        }
    });
    res.send();
});

module.exports = stuffsRouter;