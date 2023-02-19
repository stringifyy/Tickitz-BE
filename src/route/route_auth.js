const express = require("express");
const router = express();
const formUpload = require('../middleware/formUpload')

const authController = require("../controller/controller_auth");

router.post("/login", authController.login);
router.post("/register", authController.register);

router.get("/users", authController.get);
router.get("/users/:id", authController.getDetail);
router.patch("/users/:id", formUpload.single('profile_image'), authController.update);
router.delete("/users/:id", authController.remove);

module.exports = router;
