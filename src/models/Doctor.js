const mongoose = require("mongoose");

const data_schema = mongoose.Schema({
  name: String,
  degree: String,
  cost: Number
});

module.exports = mongoose.model("Doctor", data_schema);
