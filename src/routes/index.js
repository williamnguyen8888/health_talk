const siteRouter = require("./site.router")
const authenRouter = require("./authRoutes/auth.routes")
const userRouter = require('./userRoutes/user.routes')
function route(app) {
    app.use('/auth', authenRouter)
    app.use('/user', userRouter)
    app.use('/', siteRouter)
}

module.exports = route;
