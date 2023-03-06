const mongoose = require('mongoose');

const host = process.env.DatabaseHOST;
const name = process.env.DatabaseNAME;
const user = process.env.DatabaseUSER;
const pass = process.env.DatabasePASS;

const DB = `mongodb+srv://${user}:${pass}@${host}/${name}?retryWrites=true&w=majority`;

const connect = mongoose.connect(DB);

module.exports = connect;