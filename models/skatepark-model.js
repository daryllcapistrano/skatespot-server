const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Skatepark = new Schema(
  {
    name: { type: String, required: true },
    terrain: { type: [String], required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    rating: { type: Number, required: false },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("skateparks", Skatepark);
