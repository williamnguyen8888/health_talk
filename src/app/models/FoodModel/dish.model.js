const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema(
    {
        dishName: {type: String},
        category: {type: String},
        imageDish: {type: String},
        description: {type: String},
        material: {type: String},
        createdUser: {type: String},
        public: {type: Boolean},
        status: {type: Boolean},
    }
    ,
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('Dish', DishSchema);
