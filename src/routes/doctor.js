const express = require("express");
const passport = require("passport");
const router = express.Router();
const Doctor = require("../models/Doctor");

router.get("/", (req, res) => {
  Doctor.find().exec((err, doctor) => {
    res.send(doctor);
  });
});

router.post("/", (req, res) => {
  Doctor.create(
    { name: req.body.name, degree: req.body.degree, cost: 30000 },
    function(err, doc) {
      if (err) return handleError(err);
      // saved!
      res.send("saved");
    }
  );
});

module.exports = router;
