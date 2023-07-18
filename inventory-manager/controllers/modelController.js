const Model = require('../models/model');
const Car = require('../models/car')
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

exports.model_list = asyncHandler(async(req,res,next) => {
    const model_list = await Model.find().sort({name:1})
    res.render('model_list', {title:'Models', model_list:model_list})
})

exports.model_detail = asyncHandler(async(req,res,next) => {
    const [model, cars] = await Promise.all([
        Model.findById(req.params.id),
        Car.find({model:req.params.id})
        .populate([
          { path: "make", select: "name" },
          { path: "model", select: "name" },
          { path: "year", select: "year" },
          { path: "bodyType", select: "type"},
        ])
        .sort({model:1, make:1 })
        .exec()
      ])
      res.render('model_detail', {model_detail:model, cars:cars})
})

exports.model_create_get = asyncHandler(async (req, res, next) => {
    res.render('model_form', {title: 'Create Model'})
})

exports.model_create_post = [
    body("name", "Make must have between 3 to 20 characters")
      .trim()
      .isLength({ min: 3, max: 20 })
      .escape(),

    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      const model = new Model({
        name: req.body.name,
      });
  
      if (!errors.isEmpty()) {
        //if errors, rerender with errors shown
        res.render("model_form", {
          title: "Create Model",
          model: model,
          errors: errors.array(),
        });
        return;
      } else {
        const modelExists = await Model.findOne({
          name: req.body.name,
        }).exec();
        if (modelExists) {
          res.redirect(modelExists.url);
        } else {
          await model.save();
          res.redirect(model.url);
        }
      }
    }),
  ];
exports.model_delete_get = asyncHandler(async (req, res, next) => {
    const [model, carsWithModel] = await Promise.all([
        Model.findById(req.params.id).exec(),
        Car.find({model: req.params.id})
          .populate(['make','model','year'])
          .exec(),
    ])
    if (!model) return res.redirect('/catalog/models');
  res.render("model_delete",{title:'Delete Model', model:model, carsWithModel: carsWithModel});
})

exports.model_delete_post = asyncHandler(async (req, res, next) => {
    const [model, carsWithModel] = await Promise.all([
        Model.findById(req.params.id).exec(),
        Car.find({model: req.params.id})
          .populate(['make','model','year'])
          .exec(),
    ])
    //rechecks if cars has no connection to this model
    if (carsWithModel.length) {
      return res.render("model_delete",{title:'Delete Model', model:model, carsWithModel: carsWithModel});
    } else {
        await Model.findByIdAndRemove(req.body.modelId)
        res.redirect("/catalog/models");
    }
})

exports.model_update_get = asyncHandler(async (req, res, next) => {
  const model = await Model.findById(req.params.id);

  if (model === null) {
    const err = new Error('Model not found')
    err.status = 404;
    return next(err)
  }
  res.render('model_form', {title: 'Update Model', model:model})
})

exports.model_update_post = [
  body("name", "Make must have between 3 to 20 characters")
    .trim()
    .isLength({ min: 3, max: 20 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const model = new Model({
      name: req.body.name,
      _id:req.params.id
    });

    if (!errors.isEmpty()) {
      //if errors, rerender with errors shown
      res.render("model_form", {
        title: "Update Model",
        model: model,
        errors: errors.array(),
      });
      return;
    } else {
        const theModel = await Model.findByIdAndUpdate(req.params.id, model, {})
        res.redirect(theModel.url);
    }
  }),
];