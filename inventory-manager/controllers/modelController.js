const Model = require('../models/model');
const asyncHandler = require('express-async-handler');

exports.model_list = asyncHandler(async(req,res,next) => {
    const model_list = await Model.find().sort({name:1})
    res.render('model_list', {title:'Models', model_list:model_list})
})

exports.model_detail = asyncHandler(async(req,res,next) => {
    res.send(`model Detail ${req.params.id}`)
})

exports.model_create_get = asyncHandler(async (req, res, next) => {
    res.send('model Create GET')
})

exports.model_create_post = asyncHandler(async (req, res, next) => {
    res.send('model Create POST')
})

exports.model_delete_get = asyncHandler(async (req, res, next) => {
    res.send('model Delete GET')
})

exports.model_delete_post = asyncHandler(async (req, res, next) => {
    res.send('model Delete POST')
})

exports.model_update_get = asyncHandler(async (req, res, next) => {
    res.send('model Update GET')
})

exports.model_update_post = asyncHandler(async (req, res, next) => {
    res.send('model Update POST')
})
