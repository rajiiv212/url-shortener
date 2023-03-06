const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    FirstName: {
        type: String,
        trim: true,
    },
    LastName: {
        type: String,
        trim: true,
    },
    Email: {
        type: String,
        trim: true,
    },
    Password: {
        type: String,
        trim: true,
    },
    URLs: {
        type: Array,
        default: [],
    },
});

const collection = "USERS";

const userModel = mongoose.model(collection, userSchema);

module.exports = userModel;