const Make = require("../models/make");
const Car = require("../models/car");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.make_list = asyncHandler(async (req, res, next) => {
  const make_list = await Make.find().sort({ name: 1 });
  res.render("make_list", { title: "Makes", make_list: make_list });
});

exports.make_detail = asyncHandler(async (req, res, next) => {
  const [make, cars] = await Promise.all([
    Make.findById(req.params.id),
    Car.find({ make: req.params.id })
      .populate([
        { path: "make", select: "name" },
        { path: "model", select: "name" },
        { path: "year", select: "year" },
        { path: "bodyType", select: "type" },
      ])
      .sort({ make: 1, model: 1 })
      .exec(),
  ]);
  res.render("make_detail", { make_detail: make, cars: cars });
});

exports.make_create_get = asyncHandler(async (req, res, next) => {
  res.render("make_form", { title: "Create Make" });
});

exports.make_create_post = [
  body("name", "Make must have between 3 to 20 characters")
    .trim()
    .isLength({ min: 3, max: 20 })
    .escape(),

  body("description", "Description must have 3 to 500 characters")
    .trim()
    .isLength({ min: 3, max: 500 })
    .escape(),

  body("year", "Must be a number between 1 to 9999")
    .trim()
    .isLength({ min: 1, max: 9999 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const make = new Make({
      name: req.body.name,
      description: req.body.description,
      year_founded: req.body.year,
    });

    if (!errors.isEmpty()) {
      //if errors, rerender with errors shown
      res.render("make_form", {
        title: "Create Make",
        make: make,
        errors: errors.array(),
      });
      return;
    } else {
      const makeExists = await Make.findOne({
        name: req.body.name,
      }).exec();
      if (makeExists) {
        res.redirect(makeExists.url);
      } else {
        await make.save();
        res.redirect(make.url);
      }
    }
  }),
];

exports.make_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Make Delete GET");
});

exports.make_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Make Delete POST");
});

exports.make_update_get = asyncHandler(async (req, res, next) => {
  res.send("Make Update GET");
});

exports.make_update_post = asyncHandler(async (req, res, next) => {
  res.send("Make Update POST");
});
