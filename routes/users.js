const express = require("express");
const router = express.Router();
const controller = require("../controllers/users/index");

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);
router.post("/signout", controller.signout);
router.post("/profile", controller.profile);

module.exports = router;
