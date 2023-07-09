const Car = require('../models/car');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
    res.send('Not here yet: Site home page')
})

exports.car_list = asyncHandler(async(req,res,next) => {
    res.send('Car List')
})

exports.car_detail = asyncHandler(async(req,res,next) => {
    res.send(`Car Detail ${req.params.id}`)
})

exports.car_create_get = asyncHandler(async (req, res, next) => {
    res.send('Car Create GET')
})

exports.car_create_post = asyncHandler(async (req, res, next) => {
    res.send('Car Create POST')
})

exports.car_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Car Delete GET')
})

exports.car_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Car Delete POST')
})

exports.car_update_get = asyncHandler(async (req, res, next) => {
    res.send('Car Update GET')
})

exports.car_update_post = asyncHandler(async (req, res, next) => {
    res.send('Car Update POST')
})

