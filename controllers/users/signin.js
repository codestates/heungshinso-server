const models = require("../../models");

module.exports = (req, res) => {
  const { email, password } = req.body;
  const session = req.session;
  res.send("signin");
};
