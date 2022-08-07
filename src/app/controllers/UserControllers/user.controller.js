const userModel = require("../../models/UserModels/user.model")
const healthIndex = require("../../models/CalculatorModel/healthIndex.model")
const indexCalculator = require("../../methods/Calculator/healthIndex.calculator")

class UserController {
    userInfo(req, res, next) {
        userModel
            .findOne({username: req.body.username}).lean()
            .then((user) => {
                res.send(user);
            })

    }

    insertHealthIndex = async (req, res, next) => {
        const bmr = await indexCalculator.bmr_calculator(req.body.gender, req.body.weight, req.body.height, req.body.age)
        /// cần sử lý R từ input của user
        const tdee = await indexCalculator.tdee_calculator(bmr, 1.725)
        const ideal_weight = await indexCalculator.ideal_weight(req.body.height)
        const min_weight = await indexCalculator.min_weight(req.body.height)
        const max_weight = await indexCalculator.max_weight(req.body.height)
        /// cần sử lý target lấy từ action của user
        const calories_in = await indexCalculator.calories_target(tdee, "down")
        const protein_in = await indexCalculator.protein_value_gram(req.body.weight_target)
        const fat_in = await indexCalculator.fat_value_gram(calories_in)
        const protein_calories = await indexCalculator.protein_value_calories(req.body.weight_target)
        const fat_calories = await indexCalculator.fat_value_calories(calories_in)
        const carb_in = await indexCalculator.carb_value_gram(calories_in, protein_calories, fat_calories)

        const newHealthIndex = new healthIndex({
            userId: req.body.userId,
            age: req.body.age,
            gender: req.body.gender,
            weight: req.body.weight,
            height: req.body.height,
            weight_target: req.body.weight_target,
            bmi: indexCalculator.bmi_calculator(req.body.weight, req.body.height).toFixed(2),
            bmr: bmr.toFixed(),
            tdee: tdee.toFixed(),
            ideal_weight: ideal_weight,
            min_weight: min_weight,
            max_weight: max_weight,
            calories_in: calories_in.toFixed(),
            protein_in: protein_in.toFixed(),
            fat_in: fat_in.toFixed(),
            carbs_in: carb_in.toFixed(),
        })

        newHealthIndex.save().then(
            res
            .status(200)
            .send('healthIndex save success')
        );

    }
}

module.exports = new UserController();
