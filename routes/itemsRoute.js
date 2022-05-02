const express = require("express");
const items = require("../models/itemsModel");

const itemsRouter = express.Router();

itemsRouter.get('/all', async (_, res) => {
    items.find({}).then(
        (data) => { res.status(200).json(data) }
    ).catch(
        res.status(500).json({ message: err })
    );
});

itemsRouter.get('/stuff', async (_, res) => {
    items.find({
        is_stuff: {
            $eq: true
        }
    }, 'name value weight stuff').then(
        (data)=>{
            res.status(200).json(data)
        }
    ).catch((err)=>{res.status(500).json({message:err})})
});

itemsRouter.get('/stuff/material', async (_, res) => {
    items.find({}, '').then().catch()
});

module.exports = itemsRouter;