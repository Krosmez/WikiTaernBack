const express = require('express');
const { body, param } = require('express-validator');
const characters = require('../../models/charactersModel');

const charactersRouter = express.Router();

charactersRouter.get('/all', async (_, res) => {
    characters.find({}).then(
        (data) => {
            res.status(202).json(data);
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: err });
        }
    );
});

charactersRouter.put('/:id',
    body('name').isString().escape().trim(),
    body('position').isString().escape().trim(),
    body('pnj').isObject({ "strict": false }),
    body('mob').isObject({ "strict": false }),
    async (req, res) => {
        const { id } = req.params;
        const { name, position, pnj, mob } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() });
        }

        const body = {
            name,
            position,
            pnj,
            mob
        };

        await characters.findOneAndUpdate({ _id: id }, body);
        res.status(202).send();
    });

charactersRouter.delete('/:id',
    param('id').isMongoId(),
    async (req, res) => {
        const { id } = req.params;
        await characters.findOneAndDelete({ id });
        res.status(204).send();
    });

module.exports = charactersRouter;