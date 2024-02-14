const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  createdTime: {
    type: String,
    required: true,
    default: () => {
      const now = new Date();
      return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    }, // Close the default function and add a comma if there are more fields after this
  }, // Close the createdTime field definition
});

const FoodToken = mongoose.model("FoodToken", foodTokenSchema);

module.exports = FoodToken;
