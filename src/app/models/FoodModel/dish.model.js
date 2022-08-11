const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const DishSchema = new Schema(
  {
    dishName: { type: String },
    i18n: { type: String },
    categoryId: { type: Number },
    imageDish: { type: String },
    description: { type: String },
    material: { type: String },
    createdUser: { type: Number },
    public: { type: Boolean },
    status: { type: Boolean },
  },
  {
    _id: false,
    timestamps: true,
  }
);
DishSchema.plugin(AutoIncrement, { id: "dish_id_counter" });
module.exports = mongoose.model("Dish", DishSchema);
