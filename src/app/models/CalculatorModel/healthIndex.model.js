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
        weightTarget: {type: Number},
        bmi: {type: Number},
        bmr: {type: Number},
        tdee: {type: Number},
        idealWeight: {type: Number},
        minWeight: {type: Number},
        maxWeight: {type: Number},
        caloriesIn: {type: Number},
        proteinIn: {type: Number},
        fatIn: {type: Number},
        carbsIn: {type: Number},
    },
    {
        timestamps: true,
    },
);
// Add Plugin

module.exports = mongoose.model('Health_Index', HealthIndexSchema);
