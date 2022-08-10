const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NutritionalSchema = new Schema(
    {
        parentId: {type: String},
        unit: {type: String},
        createdUser: {type: String},
        kcal: {type: Number},
        fat: {type: Number},
        protein: {type: Number},
        carb: {type: Number},
        default: {type: Boolean},
    }
    ,
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('Nutritional', NutritionalSchema);
