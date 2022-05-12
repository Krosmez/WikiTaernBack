const express = require("express");
const { body, param } = require("express-validator");
const items = require("../../models/itemsModel");

const materialsRoute = express.Router();

materialsRoute.get('/', async (_, res) => {
    await items.find({
        is_material: {
            $eq: true
        }
    }, 'name value weight material')
        .then(
            (data) => {
                res.status(202).json(data);
            })
        .catch((err) => { res.status(500).json({ message: err }) });
});

materialsRoute.get('/:id',
    param('id').isMongoId(),
    async (req, res) => {
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
        }, 'name value weight material')
            .then(
                (data) => {
                    res.status(202).json(data);
                })
            .catch((err) => { res.status(500).json({ message: err }) });
    });

materialsRoute.post('/',
    body('name').isString().escape().trim(),
    body('value').isInt().escape().trim(),
    body('weight').isInt().escape().trim(),
    body('stuff').isObject({ "strict": false }),
    body('material').isObject({ "strict": false }),
    async (req, res) => {
        const { name, value, weight, stuff, material } = req.body;

        const newMaterial = new items({
            name,
            value,
            weight,
            "is_stuff": false,
            "is_material": true,
            stuff,
            material
        });

        await newMaterial.save((err, result) => {
            if (err) { res.status(500).send({ message: err }) };
            res.json({
                result
            });
        });
    });

module.exports = materialsRoute;