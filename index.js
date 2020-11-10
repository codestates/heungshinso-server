const express = require("express");
const logger = require("morgan");
const app = express();
const port = 3000;
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("hello world!");
});
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
module.exports = app;
