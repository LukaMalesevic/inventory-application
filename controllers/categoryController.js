const Category = require("../models/categories");
const Steroid = require("../models/steroids");
const { body, valdiationResult, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const steroids = require("../models/steroids");

exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find({}, "name")
        .sort({name: 1})
        .exec();

    res.render("category_list", {title: "List of all Categories", category_list: allCategories});
});

exports.category_create_get = asyncHandler(async (req, res, next) =>{
    res.render("category_form", {title: "Create new Category"});
});

exports.category_create_post = [
    body("category_name", "Category name must contain at least 3 characters")
        .trim()
        .isLength({min: 3})
        .escape(),
    asyncHandler(async (req, res, next) =>{
        const errors = validationResult(req);
        const category = new Category({
            name: req.body.category_name,
            description: req.body.category_description
        });
        if(!errors.isEmpty()){  
            res.render("category_form", {
                title: "Create new Category",
                category: category,
                errors: errors.array(),
            });
            return;
        } else {
            const categoryExists = await Category.findOne({name: req.body.category_name}).exec();
            if(categoryExists){
                res.redirect(`/home/category/${categoryExists._id}`);
            }else {
                await category.save();
                res.redirect(`/home/category/${category._id}`);
            }
        }
    })
]

exports.category_details = asyncHandler(async (req, res, next) =>{
    const currentCategory = await Category.findById(req.params.id).exec();
    const arrayOfSteroids = await Steroid.find({category: `${req.params.id}`}).exec();

    if(currentCategory === null){
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
    }

    res.render("category_details", {title: "Category details", category: currentCategory, steroids_array: arrayOfSteroids});
});

exports.category_delete_get = asyncHandler( async (req, res, next)=>{
    const [currentCategory, allSteroidsInCategory] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Steroid.find({category: req.params.id}, "name  description").exec(),
    ]);

    if(currentCategory === null){
        res.redirect("/home/categories");
    }

    res.render("category_delete", {
        title: "Delete category",
        category: currentCategory,
        list_of_steroids: allSteroidsInCategory,
        });
});


exports.category_delete_post = asyncHandler( async (req, res, next) =>{
    const [currentCategory, allSteroidsInCategory] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Steroid.find({category: req.params.id}, "name  description").exec(),
    ]);

    if(allSteroidsInCategory.length > 0){
        res.render("category_delete", {
            title: "Delete category",
            category: currentCategory,
            list_of_steroids: allSteroidsInCategory,
            });
            return;
    }else{
        await Category.findByIdAndDelete(currentCategory._id);
        res.redirect("/home/categories");
    }
})

exports.category_update_get = asyncHandler( async(req, res, next) =>{
    const currentCategory = await Category.findById(req.params.id).exec();
    res.render("category_form", {title: "Update the form", category: currentCategory});
});

exports.category_update_post = asyncHandler(async(req, res, next)=>{
    const category = new Category({
        name: req.body.category_name,
        description: req.body.category_description,
        _id: req.params.id,
    })

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, category, {});
    res.redirect(`/home/category/${req.params.id}`);
})
