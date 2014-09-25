var _ = require('cloneextend')
  , accountRoutes = require('./routes/account')
  , authenticationRoutes = require('./routes/authentication')
  , userRoutes = require('./routes/user')
  , catchAllRoutes = require('./routes/catch-all')
  , debug = require('debug')('routes')

var routes = function(app, configuration) {
  
    app.get('/', function(req, res) {
        var config = _.cloneextend(
            configuration,
            {
                isAuthenticated: req.isAuthenticated(),
                notAuthenticated: !req.isAuthenticated(),
                showBanner: true
            }
        )
        res.render('index', config)
    })
    
    accountRoutes(app, configuration)
    authenticationRoutes(app, configuration)
    userRoutes(app, configuration)
    catchAllRoutes(app, configuration)
        
}

module.exports = routes