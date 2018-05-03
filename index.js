const express = require("express");
const passport = require("passport");
const express_fileupload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost/doctor";

require("dotenv").config();
mongoose.connect(MONGODB_URL);
require("./src/config/passport");

const app = express();

app.use(cors());
app.use(passport.initialize());
app.use(express_fileupload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth", require("./src/routes/auth"));
app.use("/clinic", require("./src/routes/clinic"));
app.use("/orders", require("./src/routes/orders"));
app.use("/doctors", require("./src/routes/doctor"));

app.listen(process.env.PORT || 8000, () =>
  console.log("listening on port 8000")
);
