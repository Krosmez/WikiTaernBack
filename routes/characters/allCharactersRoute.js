const express = require('express');
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

charactersRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, position, pnj, mob } = req.body;

    const body = {
        name,
        position,
        pnj,
        mob
    };

    await characters.findOneAndUpdate({ _id: id }, body);
    res.status(202).send();
});

charactersRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await characters.findOneAndDelete({ id });
    res.status(204).send();
});

module.exports = charactersRouter;