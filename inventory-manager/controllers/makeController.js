const Make = require('../models/make');
const Car = require('../models/car');
const asyncHandler = require('express-async-handler');

exports.make_list = asyncHandler(async(req,res,next) => {
    const make_list = await Make.find().sort({name:1})
    res.render('make_list', {title:'Makes', make_list:make_list})
})

exports.make_detail = asyncHandler(async(req,res,next) => {
    const [make, cars] = await Promise.all([
      Make.findById(req.params.id),
      Car.find({make:req.params.id})
      .populate([
        { path: "make", select: "name" },
        { path: "model", select: "name" },
        { path: "year", select: "year" },
        { path: "bodyType", select: "type"},
      ])
      .sort({make:1, model:1})
      .exec()
    ])
    res.render('make_detail', {make_detail:make, cars:cars})
})
exports.make_create_get = asyncHandler(async (req, res, next) => {
    res.send('Make Create GET')
})

exports.make_create_post = asyncHandler(async (req, res, next) => {
    res.send('Make Create POST')
})

exports.make_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Make Delete GET')
})

exports.make_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Make Delete POST')
})

exports.make_update_get = asyncHandler(async (req, res, next) => {
    res.send('Make Update GET')
})

exports.make_update_post = asyncHandler(async (req, res, next) => {
    res.send('Make Update POST')
})
