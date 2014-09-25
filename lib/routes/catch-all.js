var _ = require('cloneextend')
  , debug = require('debug')('routes/catch-all')

var routes = function(app, configuration) {
    
    app.get('/*', function(req, res) {
        var config = configuration
        var config = _.cloneextend(
            configuration,
            {
                isAuthenticated: req.isAuthenticated(),
                notAuthenticated: !req.isAuthenticated()
            }
        )
        var config = _.cloneextend(
            configuration,
            {
                isAuthenticated: false,
                notAuthenticated: true,
                pageTitle: '- Page not found',
                layout: 'minimal',
                bodyClass: 'sign-in'
            }
        )
        res.status(404).render('404', config)
    })
    
}

module.exports = routes