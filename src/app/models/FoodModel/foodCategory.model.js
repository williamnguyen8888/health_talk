const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodCategorySchema = new Schema(
    {
        parentId: {type: String},
        nameEn: {type: String},
        nameVi: {type: String},
        createdUser: {type: String},
        status: {type: Boolean}
    }
    ,
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('FoodCategory', FoodCategorySchema);
