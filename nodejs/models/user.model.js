const mongoose = require('mongoose');
const moment = require('moment');
const mongoosePaginate = require('mongoose-paginate');
var schema = new mongoose.Schema({
    username: String,
    password: String,
    age: Number,
    sex: Boolean,
    QQ: Number,
    email: String,
    education: String,
    address: String,
    cardId: Number,
    phone: Number,
    hobby: String
});
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('users', schema);