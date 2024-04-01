const express = require("express");
const router = express.Router();

const steroid_controller = require("../controllers/steroidController");
const category_controller = require("../controllers/categoryController");

router.get("/", steroid_controller.index);
router.get("/steroids", steroid_controller.steroid_list);
router.get("/categories", category_controller.category_list);
router.get("/categories/create", category_controller.category_create_get);
router.post("/categories/create", category_controller.category_create_post);
router.get("/steroid/:id", steroid_controller.steroid_details);
router.get("/category/:id", category_controller.category_details);
router.get("/steroids/create", steroid_controller.steroid_create_get);
router.post("/steroids/create", steroid_controller.steroid_create_post);

module.exports = router;