const BodyType = require('../models/bodyType');
const Car = require('../models/car')
const asyncHandler = require('express-async-handler');

exports.bodyType_list = asyncHandler(async(req,res,next) => {
    const bodyType_list = await BodyType.find()
    res.render('bodyType_list', {title:'Body Types', bodyType_list:bodyType_list})
})

exports.bodyType_detail = asyncHandler(async(req,res,next) => {
    const [bodyType, cars] = await Promise.all([
        BodyType.findById(req.params.id),
        Car.find({bodyType: req.params.id})
        .populate([
            'make',
            'model',
            'year',
            'stock',
        ])
        .sort({make: 1, model: 1})
        .exec()
    ]) 

    res.render('bodyType_detail', {bodyType_detail:bodyType, cars:cars})
})
exports.bodyType_create_get = asyncHandler(async (req, res, next) => {
    res.send('bodyType Create GET')
})

exports.bodyType_create_post = asyncHandler(async (req, res, next) => {
    res.send('bodyType Create POST')
})

exports.bodyType_delete_get = asyncHandler(async (req, res, next) => {
    res.send('bodyType Delete GET')
})

exports.bodyType_delete_post = asyncHandler(async (req, res, next) => {
    res.send('bodyType Delete POST')
})

exports.bodyType_update_get = asyncHandler(async (req, res, next) => {
    res.send('bodyType Update GET')
})

exports.bodyType_update_post = asyncHandler(async (req, res, next) => {
    res.send('bodyType Update POST')
})
