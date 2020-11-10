const express = require("express");
const logger = require("morgan");
const app = express();
const port = 3000;

const indexRouter = require("./routes/index");
const teamRouter = require("./routes/team");
const userRouter = require("./routes/users");

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//mvc patterns
app.use("/", indexRouter);
app.use("/team", teamRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});

module.exports = app;
