const express = require("express");
const router = express.Router();
const db = require("../models").user;
router.get("/", async (req, res) => {
  try {
    const users = await db.findAll();
    console.log("users", users);
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
