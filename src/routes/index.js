const siteRouter = require("./site.router")
const authenRouter = require("./AuthRoutes/auth.routes")

function route(app) {
    app.use('/auth', authenRouter)
    app.use('/', siteRouter)
}

module.exports = route;
