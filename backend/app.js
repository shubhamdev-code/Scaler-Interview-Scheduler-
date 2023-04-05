const express = require("express");
const dotenv = require("dotenv");
const interviewRoute = require("./routes/interviewRoute");

const app = express();

app.use(express.json());

// for CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/v1", interviewRoute);

module.exports = app;
