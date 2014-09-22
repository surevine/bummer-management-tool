var routes = function(app, configuration) {
    
    app.get('/', function(req, res) {
        res.render('index', configuration)
    })
    app.get('/*', function(req, res) {
        res.status(404).end()
    })
}

module.exports = routes