const siteRouter = require("./site.router")
const authenRouter = require("./AuthRoutes/auth.routes")
const userRouter = require('./UserRoutes/user.routes')
const foodRouter = require('./FoodRoutes/foodRoutes')
function route(app) {
    app.use('/food',foodRouter)
    app.use('/auth', authenRouter)
    app.use('/user', userRouter)
    app.use('/', siteRouter)
}

module.exports = route;
