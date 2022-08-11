const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const FoodCategorySchema = new Schema(
  {
    parentId: { type: String },
    nameEn: { type: String },
    nameVi: { type: String },
    i18n: { type: String },
    createdUser: { type: String },
    status: { type: Boolean },
  },
  {
    _id: false,
    timestamps: true,
  }
);

FoodCategorySchema.plugin(AutoIncrement, { id: "foodCate_id_counter" });

module.exports = mongoose.model("FoodCategory", FoodCategorySchema);
