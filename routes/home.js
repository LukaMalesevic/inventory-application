const express = require("express");
const router = express.Router();

const steroid_controller = require("../controllers/steroidController");
const category_controller = require("../controllers/categoryController");

router.get("/", steroid_controller.index);
router.get("/steroids", steroid_controller.steroid_list);
router.get("/categories", category_controller.category_list);

module.exports = router;