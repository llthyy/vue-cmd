const mongoose = require('mongoose');
const moment           = require('moment');
const mongoosePaginate = require('mongoose-paginate');
var   schema           = new mongoose.Schema({
    userId     : String,
    productId  : String,
    orderId    : String,
    adress     : String,
    phone      : String,
    payType    : String,
    totalPrice : Number,
    orderState : String,
    createTime : Date,
    noteMessage: String
});
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Order',schema);
