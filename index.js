const express = require("express");
const logger = require("morgan");
const app = express();
const fs = require('fs');
const http = require('http');
const https = require('https');
const httpsPort = 3000;
const httpPort = 3001;
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const indexRouter = require("./routes/index");
const teamRouter = require("./routes/team");
const userRouter = require("./routes/users");

// ssl 인증서 
const key = fs.readFileSync(__dirname + '/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/selfsigned.crt');
const options = {
  key: key,
  cert: cert
};

//db
const sequelize = require("./models/index").sequelize;
sequelize.sync();

//session
app.use(cookieParser());
app.use(
  session({
    secret: "@heungshin",
    resave: true,
    saveUninitialized: true,
    cookie : {
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
      sameSite:'none',
    }
  })
);
//middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//mvc patterns
app.use("/", indexRouter);
app.use("/team", teamRouter);
app.use("/users", userRouter);


// app.listen(port, () => {
//   console.log(`server listening on ${port}`);
// });

const httpsServer = https.createServer(options, app);
const httpServer = http.createServer(app);

httpsServer.listen(httpsPort, () => {
  console.log("httpsServer starting on port : " + httpsPort)
});

httpServer.listen(httpPort, () => {
  console.log("httpServer starting on port : " + httpPort)
});


module.exports = app;
