var express = require("express");
var router = express.Router();
const Restaurant = require("../models/restaurant-data");

router.get("/", function (req, res, next) {
  res.render("home");
});

router.get("/listings", function (req, res, next) {
  res.render("listings");
});

router.get("/profile", function (req, res, next) {
  res.render("profile");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/register", function (req, res, next) {
  const restaurantData = new restaurantModel({
    Restaurantname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

  res.render("register");
});

module.exports = router;
