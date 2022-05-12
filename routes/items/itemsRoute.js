const express = require("express");
const { body, param } = require('express-validator');
const items = require("../../models/itemsModel");

const itemsRouter = express.Router();

itemsRouter.get('/all', async (_, res) => {
    await items.find({}).then((data) => {
        res.status(202).json(data)
    }).catch((err) => {
        res.status(500).json({ message: err })
    });
});

itemsRouter.put('/:id',
    param('id').isMongoId(),
    body('name').isString().escape().trim(),
    body('value').isInt().escape().trim(),
    body('weight').isInt().escape().trim(),
    body('stuff').isObject({ "strict": false }),
    body('material').isObject({ "strict": false }),
    async (req, res) => {
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

itemsRouter.delete('/:id',
    param('id').isMongoId(),
    async (req, res) => {
        const { id } = req.params;
        await items.findOneAndDelete({ id });
        res.status(204).send();
    });

module.exports = itemsRouter;