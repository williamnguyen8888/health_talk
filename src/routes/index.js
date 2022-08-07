const siteRouter = require("./site.router")
const authenRouter = require("./AuthRoutes/auth.routes")
const userRouter = require('./UserRoutes/user.routes')
function route(app) {
    app.use('/auth', authenRouter)
    app.use('/user', userRouter)
    app.use('/', siteRouter)
}

module.exports = route;
