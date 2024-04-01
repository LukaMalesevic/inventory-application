const Steroid = require("../models/steroids");
const Category = require("../models/categories");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    const [
        numSteroids,
        numCategories,
    ] = await Promise.all([
        Steroid.countDocuments({}).exec(),
        Category.countDocuments({}).exec(),
    ]);

    res.render("index", {
        title: "Welcome to steroids shop",
        steroid_count: numSteroids,
        category_count: numCategories,
    });
});

exports.steroid_list = asyncHandler(async (req, res, next) =>{
    const allSteroids = await Steroid.find({}, "name")
        .sort({name : 1})
        .exec();

    res.render("steroid_list", { title: "List of all Steroids", steroid_list: allSteroids});
});