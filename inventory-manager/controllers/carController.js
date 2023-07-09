const Car = require('../models/car');
const asyncHandler = require('express-async-handler');
const categories = ['Cars','Makes','Models','Years'] //test view input

exports.index = asyncHandler(async (req, res, next) => {
    res.render('catalog', {title: 'Home', categories:categories})
})

exports.car_list = asyncHandler(async(req,res,next) => {
    const car_list = await Car.find()
    res.render('car_list', {title:'Cars', car_list:car_list})
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

