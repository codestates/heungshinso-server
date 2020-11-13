const express = require("express");
const router = express.Router();
const controller = require("../controllers/users/index");
const callback = require('../controllers/users/callback');

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);
router.post("/signout", controller.signout);
router.post("/profile", controller.profile);
router.get("/signin/githublogin", redirect.get);
router.get("/signin/callback", callback.get);
// router.get("/signin/callback/welcome", redirect.redirect);

module.exports = router;
