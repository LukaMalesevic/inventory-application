const Category = require("../models/categories");
const Steroid = require("../models/steroids");
const { body, valdiationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find({}, "name")
        .sort({name: 1})
        .exec();

    res.render("category_list", {title: "List of all Categories", category_list: allCategories});
});