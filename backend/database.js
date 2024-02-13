const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//connection

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log("db not connected");
    });
};

module.exports = connectDB;
