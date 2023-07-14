const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MakeSchema = new Schema({
    name: {type:String, required: true, minlength:3, maxLength:50},
    year_founded: {type: Number, required: true, min:1, max:9999},
    description: {type:String, required: true, minLength:3, maxLength:500}
})

MakeSchema.virtual('url').get(function() {
    return `/catalog/make/${this._id}`;
})

module.exports = mongoose.model('Make', MakeSchema);