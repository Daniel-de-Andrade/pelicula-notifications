const express = require("express");
const bodyparser = require("body-parser");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello!");
});

app.listen(5000);
