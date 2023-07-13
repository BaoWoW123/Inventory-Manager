const Year = require('../models/year');
const Car = require('../models/car')
const asyncHandler = require('express-async-handler');

exports.year_list = asyncHandler(async(req,res,next) => {
    const year_list = await Year.find().sort({year:-1})
    res.render('year_list', {title:'Years', year_list:year_list})
})

exports.year_detail = asyncHandler(async(req,res,next) => {
    const [year, cars] = await Promise.all([
        Year.findById(req.params.id),
        Car.find({year:req.params.id})
        .populate([
          { path: "make", select: "name" },
          { path: "model", select: "name" },
          { path: "year", select: "year" },
          { path: "bodyType", select: "type"},
        ])
        .sort({year:1,make:1, model:1})
        .exec()
      ])
      res.render('year_detail', {year:year, cars:cars})
})

exports.year_create_get = asyncHandler(async (req, res, next) => {
    res.send('Year Create GET')
})

exports.year_create_post = asyncHandler(async (req, res, next) => {
    res.send('Year Create POST')
})

exports.year_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Year Delete GET')
})

exports.year_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Year Delete POST')
})

exports.year_update_get = asyncHandler(async (req, res, next) => {
    res.send('Year Update GET')
})

exports.year_update_post = asyncHandler(async (req, res, next) => {
    res.send('Year Update POST')
})
