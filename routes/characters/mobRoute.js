const express = require('express');
const characters = require('../../models/charactersModel');

const mobRouter = express.Router();

mobRouter.get('/mob', async (_, res) => {
    characters.find({
        is_mob: { $eq: true }
    }, 'id name position pnj')
        .then((data) => { res.status(200).json(data) })
        .catch((err) => { res.status(500).json({ message: err }) });
});

module.exports = mobRouter;