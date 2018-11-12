var mongoose = require('mongoose'),
    // materializedPlugin = require('mongoose-materialized'),
    Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');


var Commentchema = new Schema({
    issueUserId: String,
    issueUserType: String,
    issueTime: String,
    issueType: String,
    issueTitle: String,
    issueLike: String,
    issueRead: String,
    issueComment: String,
    issueContent: String,
});

Commentchema.plugin(mongoosePaginate);
module.exports = mongoose.model('comment', Commentchema);