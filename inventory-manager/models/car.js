const mongoose = require('mongoose');
const Make = require('./make')

const Schema = mongoose.Schema;

const CarSchema = new Schema({
    make: {type:Schema.ObjectId, required: true, ref:'Make'},
    model: {type:Schema.ObjectId, required: true, ref:'Model'},
    bodyType: {type:[Schema.ObjectId], required: true, ref:'Bodytype'},
    price: {type:Number, required: true},
    year: {type:Schema.ObjectId, required: true, ref:'Year'},
    description: {type:String, minlength:3, maxLength:500},
    stock: {type:String,required:true, enum:['Available', 'Unavailable'], default:'Available'}
})

CarSchema.virtual('url').get(function() {
    return `/catalog/car/${this._id}`
})

module.exports = mongoose.model('Car', CarSchema);