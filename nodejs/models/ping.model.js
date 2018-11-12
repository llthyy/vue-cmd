var mongoose = require('mongoose'),
    // materializedPlugin = require('mongoose-materialized'),
    Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');


var Commentchema = new Schema({
    pingUserId: String,
    pingTime: String,
    issueId: String,
    pingContent: String,

});

Commentchema.plugin(mongoosePaginate);
module.exports = mongoose.model('ping', Commentchema);