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
router.get("/category/:id/delete", category_controller.category_delete_get);
router.post("/category/:id/delete", category_controller.category_delete_post);
router.get("/steroid/:id/delete", steroid_controller.steroid_delete_get);
router.post("/steroid/:id/delete", steroid_controller.steroid_delete_post);
router.get("/steroid/:id/update", steroid_controller.steroid_update_get);
router.post("/steroid/:id/update", steroid_controller.steroid_update_post);
router.get("/category/:id/update", category_controller.category_update_get);
router.post("/category/:id/update", category_controller.category_update_post);


module.exports = router;