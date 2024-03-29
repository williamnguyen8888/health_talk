const foodCategoryController = require("../../app/controllers/FoodControllers/foodCategory.controller");
const { isAuth } = require("../../app/middlewares/auth.middleware");

function foodCateRoutes(router) {
  router.post("/createCategory", foodCategoryController.createFoodCategory);
  router.get("/getCategories", foodCategoryController.getFoodCategories);
  router.post(
    "/getCategoryByName",
    foodCategoryController.getFoodCategoryByName
  );
  router.post("/getCategoryById", foodCategoryController.getFoodCategoryById);
  router.post("/updateCategory", foodCategoryController.updateFoodCategory);
  router.post("/deleteCategory", foodCategoryController.deleteFoodCategory);
}

module.exports = foodCateRoutes;
