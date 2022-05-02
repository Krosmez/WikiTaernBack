const express = require("express");
const items = require("../../models/itemsModel");

const itemsRoute = express.Router();

itemsRoute.get('/all', async (_, res) => {
    items.find({}).then(
        (data) => { res.status(200).json(data) }
    ).catch(
        res.status(500).json({ message: err })
    );
});

itemsRoute.get('/stuff', async (_, res) => {
    items.find({}, '').then().catch()
});

itemsRoute.get('/stuff/material', async (_, res) => {
    items.find({}, '').then().catch()
});

module.exports = items;