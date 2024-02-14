var express = require("express");
var router = express.Router();

const FoodToken = require("../models/food-token");
const restaurantModel = require("../models/restaurant-data");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
passport.use(new LocalStrategy(restaurantModel.authenticate()));

router.get("/", function (req, res) {
  res.render("home");
});

router.get("/profile", isLoggedIn, function (req, res) {
  res.render("profile");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.get("/register", function (req, res) {
  res.render("register");
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
});

router.get("/listings", async (req, res) => {
  try {
    const foodDonations = await FoodToken.find();

    res.render("listings", { foodDonations });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//register
router.post("/register", function (req, res) {
  const restaurantData = new restaurantModel({
    Restaurantname: req.body.Restaurantname,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  console.log(restaurantData);
  restaurantModel
    .register(restaurantData, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    });
});

//login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

//raise
router.post("/profile", isLoggedIn, async (req, res) => {
  const userId = req.user._id;
  const found = await restaurantModel.findOne({ _id: userId });

  FoodToken.create({
    restaurant: found.Restaurantname,
    serveSize: req.body.serveSize,
    foodDescription: req.body.foodDescription,
  });

  res.redirect("/profile");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
