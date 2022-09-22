const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const mainRouter = require("../lab2.1/routes/index");

// routes
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// Dùng để node.js app lấy được file main.js trong folder public
app.use(express.static(path.join(__dirname, "public")));
app.use(mainRouter);

app.listen(3001);
