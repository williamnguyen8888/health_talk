class SiteController {
    // [GET] /
    index(req, res, next) {
        res.send('index')
    }

    // [GET] /search
    search(req, res) {
        res.send('search')
    }
}

module.exports = new SiteController();
