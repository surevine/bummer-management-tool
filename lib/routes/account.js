var _ = require('cloneextend')
  , users = require('../models/users')
  , debug = require('debug')('routes/account')
  , ensureAuthenticated = require('./ensure-authenticated')

var routes = function(app, configuration) {
    
    app.get('/account', ensureAuthenticated, function(req, res) {
        var config = _.cloneextend(
            configuration,
            {
                isAuthenticated: true,
                layout: 'dashboard'
            }
        )
        res.render('account', config)
    })

    app.get('/account/users', ensureAuthenticated, function(req, res) {
        var config = _.cloneextend(
            configuration,
            {
                isAuthenticated: true,
                layout: 'dashboard'
            }
        )
        users.getUsers(req.user, function(error, results) {
            if (error) {
                var message = error.message
                if ('database' === error.type) { /* i.e. likely a database error */
                    res.status(500)
                    debug('error', 'Setting generic 500 error message')
                }
                config.error = true
                config.errorMessage = message
                config.noUsers = true
            } else {
                config.noUsers = (results.length === 0)
                config.users = results
            }
            res.render('account/user-list', config)
        })
    })
    
}

module.exports = routes