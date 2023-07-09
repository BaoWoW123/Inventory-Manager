const Year = require('../models/year');
const asyncHandler = require('express-async-handler');

exports.year_list = asyncHandler(async(req,res,next) => {
    res.send('Year List')
})

exports.year_detail = asyncHandler(async(req,res,next) => {
    res.send(`year Detail ${req.params.id}`)
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
