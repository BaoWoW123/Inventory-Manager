const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CarSchema = new Schema({
    make: {type:String, required: true, minlength:3, maxLength:50},
    model: {type:String, required: true, minlength:3, maxLength:50},
    bodyType: {type:String, required: true, minlength:3, maxLength:50},
    price: {type:Number, required: true},
    year: {type: Number, required: true, max:9999},
    description: {type:String, minlength:3, maxLength:200},
    stock: {type:String,required:true, enum:['Available', 'Unavailable'], default:'Available'}
})

CarSchema.virtual('url').get(function() {
    return `/catalog/car/${this._id}`
})
CarSchema.virtual('name').get(function() {
    if (this.make && this.model) {
        return `${this.make} ${this.model}`;
    }
})

module.exports = mongoose.model('cars', CarSchema);