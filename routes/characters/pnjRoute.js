const express = require('express');
const characters = require('../../models/charactersModel');

const pnjRouter = express.Router();

pnjRouter.get('/', async (_, res) => {
    characters.find({
        is_pnj: { $eq: true }
    }, 'id name position pnj')
        .then((data) => { res.status(200).json(data) })
        .catch((err) => { res.status(500).json({ message: err }) })
})

module.exports = pnjRouter;