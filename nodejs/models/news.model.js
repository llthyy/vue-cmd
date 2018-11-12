const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var schema = new mongoose.Schema({
    cateId: String,
    cateName: String,
    cateName: String,
    userId: String,
    newsTitle: String,
    newsContent: String,
    newsSource: String,
    newsAuthor: String,
    newsDate: String,
    isHot: String,
    isTop: String

});
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('News', schema, 'news');