const Car = require("../models/car");
const BodyType = require("../models/bodyType");
const Year = require("../models/year");
const Make = require("../models/make");
const Model = require("../models/model");
const asyncHandler = require("express-async-handler");
const categories = ["Cars", "Makes", "Models", "Years"]; //test view input

exports.index = asyncHandler(async (req, res, next) => {
  res.render("catalog", { title: "Home", categories: categories });
});

exports.car_list = asyncHandler(async (req, res, next) => {
  const car_list = await Car.find()
    .populate([
      { path: "make", select: "name -_id" },
      { path: "model", select: "name -_id" },
      { path: "year", select: "year -_id" },
      { path: "bodyType", select: "type -_id" },
    ])
    .exec();
  res.render("car_list", { title: "Cars", car_list: car_list });
});

exports.car_detail = asyncHandler(async (req, res, next) => {
  const [car] = await Promise.all([
    Car.findById(req.params.id)
      .populate([
        { path: "make", select: "-_id" },
        { path: "model", select: "-_id" },
        { path: "year", select: "-_id" },
        { path: "bodyType", select: "-_id" },
      ])
      .exec(),
  ]);
  res.render("car_detail", {
    car: car,
  });
});

exports.car_create_get = asyncHandler(async (req, res, next) => {
  res.send("Car Create GET");
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
