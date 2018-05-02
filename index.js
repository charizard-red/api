const express = require("express");
const passport = require("passport");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
mongoose.connect("mongodb://localhost/doctor");
require("./src/config/passport");

const app = express();

app.use(cors());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth", require("./src/routes/auth"));
app.use("/doctor", require("./src/routes/doctor"));

app.listen(process.env.PORT || 8000, () =>
  console.log("listening on port 8000")
);
