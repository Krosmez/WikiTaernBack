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

charactersRouter.get('/pnj', async (_, res) => {
    characters.find({
        $and: [
            {
                "isMob.isNormal": {
                    $eq: "false"
                }
            },
            {
                "isMob.isBoss": {
                    $eq: "false"
                }

            },
            {
                "isMob.isChampion": {
                    $eq: "false"
                }
            }
        ]
    },
        'id name position isPNJ'
    )
        .then((data) => { res.status(200).json(data) })
        .catch((err) => { res.status(500).json({ message: err }) })
})

module.exports = charactersRouter;