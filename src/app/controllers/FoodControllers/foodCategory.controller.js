const foodCateModel = require("../../models/FoodModel/foodCategory.model")
const constants = require("../../../constants")
const ObjectId = require('mongodb').ObjectId;
exports.createFoodCategory = async (req, res) => {
    let foodCategoryCheck = false;

    await foodCateModel.findOne({nameEn: req.body.nameEn}).then((foodCategory) => {
        if (foodCategory) {
            foodCategoryCheck = true;
        }
    })

    if (foodCategoryCheck) {
        return res.status(409).send('This food category(EN) has already existed');
    }

    await foodCateModel.findOne({nameVi: req.body.nameVi}).then((foodCategory) => {
        if (foodCategory) {
            foodCategoryCheck = true
        }
    })

    if (foodCategoryCheck) {
        return res.status(409).send('This food category(Vi) has already existed');
    }


    const newFoodCate = new foodCateModel(req.body);
    await newFoodCate.save().then((newFoodCateRes) => {
        if (!newFoodCateRes) {
            return res
                .status(400)
                .send('There was an error during food category creation, please try again.');
        }
        return res
            .status(200)
            .send(newFoodCateRes);
    })
}
exports.getFoodCategories = (req, res) => {
    foodCateModel.find().then((foodCategories) => {
        res.send(foodCategories);
    })
}
exports.getFoodCategoryByName = (req, res) => {
    foodCateModel.findOne({
        $or: [
            {nameEn: req.body.foodCateName},
            {nameVi: req.body.foodCateName},
        ]
    }).then((foodCategory) => {
        if (!foodCategory) {
            return res
                .status(400)
                .send("can't find food category");
        }
        return res.status(200).send(foodCategory);
    })
}
exports.getFoodCategoryById = (req, res) => {
    foodCateModel.findOne({
        _id: ObjectId(req.body.foodCateId)
    }).then((foodCategory) => {
        if (!foodCategory) {
            return res
                .status(400)
                .send("can't find food category");
        }
        return res.status(200).send(foodCategory);
    })
}



