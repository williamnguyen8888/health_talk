const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodstuffSchema = new Schema(
  {
    foodstuffName: { type: String },
    i18n: { type: String },
    category: { type: String },
    imageFoodstuff: { type: String },
    description: { type: String },
    material: { type: String },
    created_user: { type: String },
    public: { type: Boolean },
    status: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Foodstuff", FoodstuffSchema);
