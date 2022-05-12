const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const local = "dotenv/config";
// Items Router
const allItems = require('./routes/items/itemsRoute');
const stuffsRoute = require('./routes/items/stuffsRoute');
const materialsRoute = require('./routes/items/materialsRoute');
//Characters Router
const charactersRoute = require('./routes/characters/allCharactersRoute');
const mobRoute = require('./routes/characters/mobRoute');
const pnjRoute = require('./routes/characters/pnjRoute');
require(local);

const startApplication = async () => {
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USER || 'username'}:${process.env.DB_PWD || 'secured_pwd'}@${process.env.CLUSTER_NAME || 'Cluster0'}.3vm4z.mongodb.net/${process.env.DB_NAME || 'myFirstDatabase'}?retryWrites=true&w=majority`,
        {
            useUnifiedTopology: true,
            useNewURLParser: true
        }
    );
    console.log(`Successfully connected to MongoDB at: ${process.env.DB_NAME || "local"} on ${process.env.CLUSTER_NAME || "noCluster"}`);

    await app.listen(process.env.PORT || 8080);
    console.log(`Listening on ${process.env.PORT || 8080}`);
}

const app = express();
app.use(express.json());
// all routes
app.use("/items", allItems);
app.use("/stuff", stuffsRoute);
app.use("/material", materialsRoute);
app.use("/characters", charactersRoute);
app.use("/mob", mobRoute);
app.use("/pnj", pnjRoute);

startApplication();