const dishModel = require("../../models/FoodModel/dish.model");
const nutritionalModel = require("../../models/FoodModel/nutritional.model");

//create
exports.createDish = (req, res) => {
  const filter = { dishName: req.body.dishName };
  dishModel.findOne(filter).then((dish) => {
    if (dish) {
      return res.status(409).send("This dish has already existed");
    }
    const newDish = new dishModel(req.body);
    newDish.save().then((newDishRes) => {
      req.body.parentId = newDishRes._id;
      const newNutrition = new nutritionalModel(req.body);
      newNutrition.save().then((newNutritionRes) => {
        return res.status(200).send(newDishRes);
      });
    });
  });
};
//get all dish
exports.getDishes = (req, res) => {
  dishModel
    .aggregate([
      {
        $lookup: {
          from: "nutritionals", // collection name in db
          localField: "_id",
          foreignField: "parentId",
          as: "nutritionals",
        },
      },
    ])
    .exec(function (err, dishes) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(dishes);
    });
};
