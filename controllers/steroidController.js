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

exports.steroid_details = asyncHandler(async (req, res, next) =>{
    const currentSteroid = await Steroid.findById(req.params.id).exec();
    const currentCategory = await Category.findById(currentSteroid.category).exec();

    if(currentSteroid === null){
        const err = new Error("Steroid not found");
        err.status = 404;
        return next(err);
    }

    res.render("steroid_details", {
        title: "Steroid details",
        steroid: currentSteroid,
        category: currentCategory
    });
});

exports.steroid_create_get = asyncHandler(async (req, res, next) =>{
    const allCategories = await Category.find({}).exec();
    res.render("steroid_form", {title: "Create new Steroid", categories: allCategories});
});

exports.steroid_create_post = [
    body("steroid_name")
        .trim()
        .isLength({min: 1})
        .escape(),
    asyncHandler(async (req, res, next) =>{
        const errors = validationResult(req);

        const steroid = new Steroid({
            name: req.body.steroid_name,
            description: req.body.steroid_description,
            category: req.body.steroid_category,
            price: req.body.steroid_price,
            number_in_stock: req.body.steroid_count
        })

        if(!errors.isEmpty()){
            res.render("steroid_form", {
                title: "Create new Steroid",
                steroid: steroid,
                errors: errors.array(),
            });
            return;
        } else{
            await steroid.save();
            res.redirect(`/home/steroid/${steroid._id}`);
        }
    }) 
    
    
]

exports.steroid_delete_get = asyncHandler(async (req, res, next) =>{
    const currentSteroid = await Steroid.findById(req.params.id).exec();
    res.render("steroid_delete", { title: "Delete steroid", steroid: currentSteroid});
})

exports.steroid_delete_post = asyncHandler(async (req, res, next) =>{
    const currentSteroid = await Steroid.findById(req.params.id).exec();
    await Steroid.findByIdAndDelete(currentSteroid._id);
    res.redirect("/home/steroids");
})
