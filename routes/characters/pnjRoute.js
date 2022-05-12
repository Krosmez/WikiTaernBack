const express = require('express');
const { body, param } = require('express-validator');
const characters = require('../../models/charactersModel');

const pnjRouter = express.Router();

pnjRouter.get('/', async (_, res) => {
    characters.find({
        is_pnj: { $eq: true }
    }, 'id name position pnj')
        .then((data) => { res.status(202).json(data) })
        .catch((err) => { res.status(500).json({ message: err }) });
});

pnjRouter.get('/:id',
    param('id').isMongoId(),
    async (req, res) => {
        const { id } = req.params;
        await characters.find({
            $and: [
                { id },
                {
                    is_pnj: {
                        $eq: true
                    }
                }
            ]
        }, 'id name position pnj')
            .then(
                (data) => {
                    res.status(202).json(data)
                })
            .catch((err) => { res.status(500).json({ message: err }) });
    });

pnjRouter.post('/',
    body('name').isString().escape().trim(),
    body('position').isString().escape().trim(),
    body('pnj').isObject({ "strict": false }),
    body('mob').isObject({ "strict": false }),
    async (req, res) => {
        const { name, position, pnj, mob } = req.body;

        const newPnj = new characters({
            name,
            position,
            "is_pnj": true,
            "is_mob": false,
            pnj,
            mob
        });

        await newPnj.save((err, result) => {
            if (err) { res.status(500).send({ message: err }) };
            res.json({
                result
            });
        });
    });

module.exports = pnjRouter;