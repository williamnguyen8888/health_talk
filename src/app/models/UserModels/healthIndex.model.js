const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const HealthIndexSchema = new Schema(
    {
        userId: {type: String},
        age: {type: Number},
        gender: {type: String},
        weight: {type: Number},
        height: {type: Number},
        weight_target: {type: Number},
        bmi: {type: Number},
        bmr: {type: Number},
        tdee: {type: Number},
        ideal_weight: {type: Number},
        min_weight: {type: Number},
        max_weight: {type: Number},
        calories_in: {type: Number},
        protein_in: {type: Number},
        fat_in: {type: Number},
        carbs_in: {type: Number},
    },
    {
        timestamps: true,
    },
);
// Add Plugin

module.exports = mongoose.model('Health_Index', HealthIndexSchema);
