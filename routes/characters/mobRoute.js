const express = require('express');
const { body, param } = require('express-validator');
const characters = require('../../models/charactersModel');

const mobRouter = express.Router();

mobRouter.get('/', async (_, res) => {
    characters.find({
        is_mob: { $eq: true }
    }, 'id name position mob')
        .then((data) => { res.status(202).json(data) })
        .catch((err) => { res.status(500).json({ message: err }) });
});

mobRouter.get('/:id',
    param('id').isMongoId(),
    async (req, res) => {
        const { id } = req.params;
        await characters.find({
            $and: [
                { id },
                {
                    is_mob: {
                        $eq: true
                    }
                }
            ]
        }, 'id name position mob')
            .then(
                (data) => {
                    res.status(202).json(data);
                })
            .catch((err) => { res.status(500).json({ message: err }) });
    });

mobRouter.post('/',
    body('name').isString().escape().trim(),
    body('position').isString().escape().trim(),
    body('pnj').isObject({ "strict": false }),
    body('mob').isObject({ "strict": false }),
    async (req, res) => {
        const { name, position, pnj, mob } = req.body;

        const newMob = new characters({
            name,
            position,
            "is_pnj": false,
            "is_mob": true,
            pnj,
            mob
        });

        await newMob.save((err, result) => {
            if (err) { res.status(500).send({ message: err }) };
            res.json({
                result
            });
        });
    });

module.exports = mobRouter;