const express = require('express');
const router = express.Router();
const authMiddlewares = require('../../app/middlewares/auth.middleware')
const userController = require('../../app/controllers/UserControllers/user.controller');

const isAuth = authMiddlewares.isAuth;

router.post('/profile',isAuth, userController.userInfo);
router.post('/health-index',isAuth, userController.insertHealthIndex);

module.exports = router;
