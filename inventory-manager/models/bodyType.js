const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BodyTypeSchema = new Schema({
    type: {type:String, required: true, minlength:3, maxLength:20},
    description: {type: String, required: true, minlength:3, maxLength: 500},
})

BodyTypeSchema.virtual('url').get(function() {
    return `/catalog/bodytype/${this._id}`;
})

module.exports = mongoose.model('Bodytype', BodyTypeSchema, 'bodyTypes');