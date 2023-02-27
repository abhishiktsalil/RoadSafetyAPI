require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const userRouter = require("./api/users/user.router");
const dashboardRouter = require("./api/dashboard/dashboard.router");


//logger (Custom middleware)
app.use(logger);

app.use(cors(corsOptions));

//built-in middleware to handle urlencoded data(form data)
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');  //http://167.71.228.167:9000

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//routes
app.use("/api/users", userRouter);
app.use("/api/dashboard", dashboardRouter);

app.use(errorHandler);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server up and running on port : ${process.env.APP_PORT}`);
});
