const Make = require('../models/make');
const asyncHandler = require('express-async-handler');

exports.make_list = asyncHandler(async(req,res,next) => {
    res.send('Make List')
})

exports.make_detail = asyncHandler(async(req,res,next) => {
    res.send(`make Detail ${req.params.id}`)
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
