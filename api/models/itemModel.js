const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
    content:  {
        type: String,
        unique: true
    },
    status: Boolean,
    date: { type: Date, default: Date.now },
});

let itemModel = mongoose.model('Item', itemSchema);

module.exports = itemModel;