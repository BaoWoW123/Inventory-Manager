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
    
  res.render("car_form", {title:'Create Car'});
});

exports.car_create_post = asyncHandler(async (req, res, next) => {
  res.send("Car Create POST");
});

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
