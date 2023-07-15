const BodyType = require("../models/bodyType");
const Car = require("../models/car");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.bodyType_list = asyncHandler(async (req, res, next) => {
  const bodyType_list = await BodyType.find();
  res.render("bodyType_list", {
    title: "Body Types",
    bodyType_list: bodyType_list,
  });
});

exports.bodyType_detail = asyncHandler(async (req, res, next) => {
  const [bodyType, cars] = await Promise.all([
    BodyType.findById(req.params.id),
    Car.find({ bodyType: req.params.id })
      .populate(["make", "model", "year", "stock"])
      .sort({ make: 1, model: 1 })
      .exec(),
  ]);

  res.render("bodyType_detail", { bodyType_detail: bodyType, cars: cars });
});
exports.bodyType_create_get = asyncHandler(async (req, res, next) => {
  res.render("bodyType_form", { title: "Create Body Type" });
});

exports.bodyType_create_post = [
  body("type", "Body type must have between 3 to 20 characters")
    .trim()
    .isLength({ min: 3, max: 20 })
    .escape(),

  body("description", "Description must have 3 to 500 characters")
    .trim()
    .isLength({ min: 3, max: 500 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const bodyType = new BodyType({
      type: req.body.type,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      //if errors, rerender with errors shown
      res.render("bodyType_form", {
        title: "Create Body Type",
        bodyType: bodyType,
        errors: errors.array(),
      });
      return;
    } else {
      const bodyTypeExists = await BodyType.findOne({
        type: req.body.type,
      }).exec();
      if (bodyTypeExists) {
        res.redirect(bodyTypeExists.url);
      } else {
        await bodyType.save();
        res.redirect(bodyType.url);
      }
    }
  }),
];

exports.bodyType_delete_get = asyncHandler(async (req, res, next) => {
    const [bodyType, carsWithType] = await Promise.all([
        BodyType.findById(req.params.id).exec(),
        Car.find({bodyType: req.params.id})
          .populate(['make','model','year'])
          .exec(),
    ])
    if (!bodyType) return res.redirect('/catalog/bodytypes');
  res.render("bodyType_delete",{title:'Delete Body Type', bodyType:bodyType, carsWithType: carsWithType});
});

exports.bodyType_delete_post = asyncHandler(async (req, res, next) => {
    const [bodyType, carsWithType] = await Promise.all([
        BodyType.findById(req.params.id).exec(),
        Car.find({bodyType: req.params.id})
          .populate(['make','model','year'])
          .exec(),
    ])
    //rechecks if cars has no connection to this bodyType
    if (carsWithType.length) {
      return res.render("bodyType_delete",{title:'Delete Body Type', bodyType:bodyType, carsWithType: carsWithType});
    } else {
        await BodyType.findByIdAndRemove(req.body.bodyTypeId)
        res.redirect("/catalog/bodytypes");
    }
});

exports.bodyType_update_get = asyncHandler(async (req, res, next) => {
  res.send("bodyType Update GET");
});

exports.bodyType_update_post = asyncHandler(async (req, res, next) => {
  res.send("bodyType Update POST");
});
