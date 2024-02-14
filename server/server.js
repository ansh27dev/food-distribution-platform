var express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
var app = express();

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./database");

var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var port = process.env.PORT || "3000";
app.set("port", port);

connectDB(); //connecting database

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//added
const restaurantModel = require("./models/restaurant-data");

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "avashya",
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(restaurantModel.serializeUser());
passport.deserializeUser(restaurantModel.deserializeUser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/users", usersRouter);

const server = app.listen(port, () => {
  console.log(`server running on ${port}`);
});

module.exports = server;
