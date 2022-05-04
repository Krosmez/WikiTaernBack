const express = require('express');
const characters = require('../../models/charactersModel');

const mobRouter = express.Router();

mobRouter.get('/', async (_, res) => {
    characters.find({
        is_mob: { $eq: true }
    }, 'id name position mob')
        .then((data) => { res.status(202).json(data) })
        .catch((err) => { res.status(500).json({ message: err }) });
});

mobRouter.get('/:id', async (req, res) => {
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

module.exports = mobRouter;