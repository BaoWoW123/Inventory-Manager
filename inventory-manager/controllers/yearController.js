const Year = require('../models/year');
const Car = require('../models/car')
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

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
    res.render('year_form', {title: 'Create Year'})
})

exports.year_create_post = [
    body("year", "Must be a number between 1 to 9999")
      .trim()
      .isLength({ min: 1, max: 9999 })
      .escape(),

    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      const year = new Year({
        year: req.body.year,
      });
  
      if (!errors.isEmpty()) {
        //if errors, rerender with errors shown
        res.render("year_form", {
          title: "Create Year",
          year: year,
          errors: errors.array(),
        });
        return;
      } else {
        const yearExists = await Year.findOne({
          year: req.body.year,
        }).exec();
        if (yearExists) {
          res.redirect(yearExists.url);
        } else {
          await year.save();
          res.redirect(year.url);
        }
      }
    }),
  ];

exports.year_delete_get = asyncHandler(async (req, res, next) => {
  const [year, carsWithYear] = await Promise.all([
    Year.findById(req.params.id).exec(),
    Car.find({ year: req.params.id })
      .populate(["make", "model", "year"])
      .exec(),
  ]);
  if (!year) return res.redirect("/catalog/years");
  res.render("year_delete", {
    title: "Delete Year",
    year: year,
    carsWithYear: carsWithYear,
  });
});

exports.year_delete_post = asyncHandler(async (req, res, next) => {
  const [year, carsWithYear] = await Promise.all([
    Year.findById(req.params.id).exec(),
    Car.find({ year: req.params.id })
      .populate(["make", "model", "year"])
      .exec(),
  ]);
  //rechecks if cars has no connection to this year
  if (carsWithYear.length) {
    return res.render("year_delete", {
      title: "Delete Year",
      year: year,
      carsWithYear: carsWithYear,
    });
  } else {
    await Year.findByIdAndRemove(req.body.yearId);
    res.redirect("/catalog/years");
  }
});

exports.year_update_get = asyncHandler(async (req, res, next) => {
    res.send('Year Update GET')
})

exports.year_update_post = asyncHandler(async (req, res, next) => {
    res.send('Year Update POST')
})
