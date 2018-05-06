require("dotenv").config();
require("./src/config/passport");

const express = require("express");
const passport = require("passport");
const express_fileupload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost/doctor";

mongoose.connect(MONGODB_URL);
const app = express();

app.use(cors());
app.use(passport.initialize());
app.use(express_fileupload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", require("./src/routes/index"));
app.use("/auth", require("./src/routes/auth"));
app.use("/clinics", require("./src/routes/clinics"));
app.use("/orders", require("./src/routes/orders"));
app.use("/doctors", require("./src/routes/doctors"));

app.listen(PORT, () =>
  console.log(`Temu Dokter API is listening on port ${PORT}`)
);
