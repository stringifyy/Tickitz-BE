const express = require("express");
const router = express();
// const formUpload = require('../middleware/formUpload')
const validation = require('../middleware/validation')
const formUploadOnline = require("../middleware/formUploadOnline");

const authController = require("../controller/controller_auth");

router.post("/login", authController.login);
router.post("/register", validation.users, authController.register);

router.get("/users", authController.get);
router.get("/users/:id", authController.getDetail);
router.get("/users-detail/:id", authController.getDetailWithHistory);
router.patch("/users/:id", formUploadOnline.single('profile_image'), authController.update);
router.delete("/users/:id", authController.remove);

module.exports = router;
