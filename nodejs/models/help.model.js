var mongoose = require('mongoose'),
    // materializedPlugin = require('mongoose-materialized'),
    Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');


var Helpchema = new Schema({
    question: String,
    answers: { type: String }
});


// CateSchema.plugin(materializedPlugin);
Helpchema.plugin(mongoosePaginate);
module.exports = mongoose.model('help', Helpchema, 'help');