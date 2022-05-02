const express = require('express');
const characters = require('../../models/charactersModel');

const charactersRouter = express.Router();

charactersRouter.get('/all', async (_, res) => {
    characters.find({}).then(
        (data) => {
            res.status(200).json(data);
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: err });
        }
    );
})
module.exports = charactersRouter;