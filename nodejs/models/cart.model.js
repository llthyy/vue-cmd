const mongoose = require('mongoose');
const moment           = require('moment');
const mongoosePaginate = require('mongoose-paginate');
var   schema           = new mongoose.Schema({
    usersID   : String,
    goodsID   : Number,
    goodsName : String,
    number    : Number,
    attr      : String,   //属性
    price     : Number,
    totalPrice: Number,
    date      : Date,
    shop      : String,   //店铺


});
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('cart',schema);
