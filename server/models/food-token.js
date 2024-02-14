const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI);

const foodTokenSchema = new Schema({
  serveSize: {
    type: String,
    required: true,
  },
  foodDescription: {
    type: String,
    required: true,
  },
  restaurant: {
    type: String,
    ref: "Restaurantname",
    required: true,
  },
});

const FoodToken = mongoose.model("FoodToken", foodTokenSchema);

module.exports = FoodToken;
