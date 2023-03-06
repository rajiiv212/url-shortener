const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    LongURL: {
        type: String,
        trim: true,
    },
    ShortURL: {
        type: String,
        unique: true,
        trim: true,
    },
    ClickCounts: {
        type: Number,
    },
});

const collection = 'URLS';

const urlModel = mongoose.model(collection, urlSchema);

module.exports = urlModel;