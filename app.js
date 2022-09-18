const http = require("http");
const express = require("express");
const app = express();
app.use("/users", (req, res, next) => {
  res.send(`<p>The Middleware that handles just /</p>`);
});
app.use("/", (req, res, next) => {
  res.send(`<p>The Middleware that handles just /users</p>`);
});

app.listen(3001);
