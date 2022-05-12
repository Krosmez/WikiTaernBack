const express = require("express");
const items = require("../../models/itemsModel");

const itemsRouter = express.Router();

itemsRouter.get('/all', async (_, res) => {
    await items.find({}).then((data) => {
        res.status(202).json(data)
    }).catch((err) => {
        res.status(500).json({ message: err })
    });
});

itemsRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, value, weight, stuff, material } = req.body;

    const body = {
        name,
        value,
        weight,
        stuff,
        material
    };

    await items.findOneAndUpdate({ _id: id }, body);
    res.status(202).send();
});

itemsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await items.findOneAndDelete({ id });
    res.status(204).send();
});

module.exports = itemsRouter;