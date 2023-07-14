const Car = require("../models/car");
const BodyType = require("../models/bodyType");
const Year = require("../models/year");
const Make = require("../models/make");
const Model = require("../models/model");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const [carCount, makeCount, modelCount, yearCount, bodyTypeCount] =
    await Promise.all([
      Car.countDocuments().exec(),
      Make.countDocuments().exec(),
      Model.countDocuments().exec(),
      Year.countDocuments().exec(),
      BodyType.countDocuments().exec(),
    ]);
  res.render("catalog", {
    title: "Home",
    carCount: carCount,
    makeCount: makeCount,
    modelCount: modelCount,
    yearCount: yearCount,
    bodyTypeCount: bodyTypeCount,
  });
});

exports.car_list = asyncHandler(async (req, res, next) => {
  const car_list = await Car.find()
    .populate([
      { path: "make", select: "name" },
      { path: "model", select: "name" },
      { path: "year", select: "year" },
      { path: "bodyType", select: "type" },
    ])
    .sort({ make: 1, model: 1 })
    .exec();
  res.render("car_list", { title: "Cars", car_list: car_list });
});

exports.car_detail = asyncHandler(async (req, res, next) => {
  const [car] = await Promise.all([
    Car.findById(req.params.id)
      .populate(["make", "model", "year", "bodyType"])
      .exec(),
  ]);
  res.render("car_detail", {
    car: car,
  });
});

exports.car_create_get = asyncHandler(async (req, res, next) => {
  const [makes, models, years, bodyTypes] = await Promise.all([
    Make.find().exec(),
    Model.find().exec(),
    Year.find().exec(),
    BodyType.find().exec(),
  ]);
  res.render("car_form", {
    title: "Create Car",
    makes: makes,
    models: models,
    years: years,
    bodyTypes: bodyTypes,
  });
});

exports.car_create_post = [
  (req, res, next) => {
    if (!(req.body.bodyType instanceof Array)) {
      if (typeof req.body.bodyType === "undefined") req.body.bodyType = [];
      else req.body.bodyType = new Array(req.body.bodyType);
    }
    next();
  },

  body("make", "Model must not be empty").trim().isLength({ min: 1 }).escape(),
  body("model", "Model must not be empty").trim().isLength({ min: 1 }).escape(),
  body("year", "Year must not be empty").trim().isLength({ min: 1 }).escape(),
  body("bodyType", "Body type must not be empty").trim().isLength({ min: 1 }).escape(),
  body("stock", "Stock must not be empty").trim().isLength({ min: 1 }).escape(),
  body("price", "Price must be a number between 1 and 9,999,999").trim().isLength({ min: 1, max: 9999999 }).escape(),
  body("description", "Description must be 1 to 500 characters").trim().isLength({ min: 3, max: 500 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const car = new Car({
      make: req.body.make,
      model: req.body.model,
      bodyType: req.body.bodyType,
      price: req.body.price,
      year: req.body.year,
      description: req.body.description,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      const [makes, models, years, bodyTypes] = await Promise.all([
        Make.find().exec(),
        Model.find().exec(),
        Year.find().exec(),
        BodyType.find().exec(),
      ]);
      //loop repopulates form with previous inputs
      for (const bodyType of bodyTypes) {
        if (car.bodyType.indexOf(bodyType._id) > -1) {
          bodyType.checked = "true";
        }
      }

      res.render("car_form", {
        title: "Create Car",
        makes: makes,
        models: models,
        years: years,
        bodyTypes: bodyTypes,
        car: car,
        errors: errors.array(),
      });
    } else {
      await car.save();
      res.redirect(car.url);
    }
  }),
];

exports.car_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Car Delete GET");
});

exports.car_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Car Delete POST");
});

exports.car_update_get = asyncHandler(async (req, res, next) => {
  res.send("Car Update GET");
});

exports.car_update_post = asyncHandler(async (req, res, next) => {
  res.send("Car Update POST");
});
