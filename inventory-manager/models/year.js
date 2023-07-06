const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const YearSchema = new Schema({
    year: {type:Number, required: true, max:9999},
})

YearSchema.virtual('url').get(function() {
    return `/catalog/year/${this._id}`;
})

module.exports = mongoose.model('Year', YearSchema);