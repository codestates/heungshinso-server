const express = require("express");
const router = express.Router();
const controller = require("../controllers/team/index");

router.post("/createteam", controller.createteam);

module.exports = router;
