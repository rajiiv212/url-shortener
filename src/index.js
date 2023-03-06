require('dotenv').config();

const express = require('express');
const cors = require('cors');

const databaseConnection = require('./databaseConnection');
const routes = require('./routes/auth');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/', routes);

server.listen(process.env.ServerPORT, () => console.log("Server up"));

databaseConnection
    .then((r) => console.log("Database up"))
    .catch((e) => console.log("Database down"));