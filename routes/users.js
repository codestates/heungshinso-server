const express = require("express");
const router = express.Router();
const controller = require("../controllers/users/index");
const callback = require('../controllers/users/callback');
const naver = require('../controllers/users/naverlogin');
const kakao = require('../controllers/users/kakaologin');

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);
router.post("/signout", controller.signout);
router.post("/profile", controller.profile);
router.get("/signin/callback", callback.get);
router.get("/signin/naverlogin", naver.get);
router.get("/signin/naverlogin/callback", naver.callback);
router.get("/signin/kakaologin", kakao.get);
router.get("/signin/kakaologin/callback", kakao.callback);
router.get("/signin/kakaologin/callback/userinfo", kakao.userinfo);

module.exports = router;
