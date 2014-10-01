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
        if (req.param('user-deleted')) {
            config.isMessage = true
            config.message = {
                title: 'Great!',
                description: 'User was succesfully deleted',
                type: 'success'
            }
        }
        users.getUsers(req.user, function(error, results) {
            if (error) {
                config.isMessage = true
                var message = error.message
                if ('database' === error.type) { /* i.e. likely a database error */
                    res.status(500)
                    debug('error', 'Setting generic 500 error message')
                }
                config.noUsers = true
                config.message = {
                    title: 'Error!',
                    type: 'danger',
                    description: message
                }
            } else {
                config.noUsers = (results.length === 0)
                config.users = results
            }
            res.render('account/user-list', config)
        })
    })
    
}

module.exports = routes