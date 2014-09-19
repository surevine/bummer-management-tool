var routes = function(app, configuration) {
    
    app.get('/', function(req, res) {
        res.render('index', configuration)
    })
    app.get('/*', function(req, res) {
        res.send(404)
    })
}

module.exports = routes