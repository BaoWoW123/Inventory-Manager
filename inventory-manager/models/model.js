const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ModelSchema = new Schema({
    name: {type:String, required: true, minlength:3, maxLength:50},
})

ModelSchema.virtual('url').get(function() {
    return `/catalog/model/${this._id}`;
})

module.exports = mongoose.model('Model', ModelSchema);