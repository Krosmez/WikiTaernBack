const express = require("express");
const items = require("../models/itemsModel");

const itemsRouter = express.Router();

itemsRouter.get('/all', async (_, res) => {
    await items.find({}).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(500).json({ message: err })
    });
});

itemsRouter.get('/stuff', async (_, res) => {
    await items.find({
        is_stuff: {
            $eq: true
        }
    }, 'name value weight stuff').then(
        (data) => {
            res.status(200).json(data)
        }
    ).catch((err) => { res.status(500).json({ message: err }) })
});

itemsRouter.get('/stuff/:id', async (req, res) => {
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
    }, 'name value weight stuff').then(
        (data) => {
            res.status(200).json(data)
        }
    ).catch((err) => { res.status(500).json({ message: err }) })
});

itemsRouter.get('/material', async (_, res) => {
    await items.find({
        is_material: {
            $eq: true
        }
    }, 'name value weight material').then(
        (data) => {
            res.status(200).json(data)
        }
    ).catch((err) => { res.status(500).json({ message: err }) })
});

itemsRouter.get('/material/:id', async (req, res) => {
    const { id } = req.params;
    await items.find({
        $and: [
            { id },
            {
                is_material: {
                    $eq: true
                }
            }
        ]
    }, 'name value weight material').then(
        (data) => {
            res.status(200).json(data)
        }
    ).catch((err) => { res.status(500).json({ message: err }) })
});

itemsRouter.put('/stuff/:id', async (req, res) => {
    const { id } = req.params;
    const { name, value, weight, stuff } = req.body;

    const body = {
        name,
        value,
        weight,
        stuff
    };

    await items.findOneAndUpdate({
        $and: [
            { id },
            {
                is_stuff: {
                    $eq: true
                }
            }
        ]
    }, body, (err, res) => {
        if (err) {
            res.status(500);
            return;
        };
        res.status(200).send();
    });
});

itemsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await items.findOneAndDelete({ id });
    res.status(204).send()
});

module.exports = itemsRouter;