const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const NutritionalSchema = new Schema(
  {
    parentId: { type: Number },
    unit: { type: String },
    createdUser: { type: Number },
    kcal: { type: Number },
    fat: { type: Number },
    protein: { type: Number },
    carb: { type: Number },
    default: { type: Boolean },
  },
  {
    _id: false,
    timestamps: true,
  }
);
NutritionalSchema.plugin(AutoIncrement, { id: "nutritional_id_counter" });
module.exports = mongoose.model("Nutritional", NutritionalSchema);
