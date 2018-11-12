const mongoose = require('mongoose');
const moment = require('moment');
const mongoosePaginate = require('mongoose-paginate');
var schema = new mongoose.Schema({
    pic: String,
    name: String,
    quantity: Number,
    price: Number,
    description: String,
    size: String,
    stadus: String,
    time: { type: Date, default: Date.now }
});
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('product', schema, 'product');