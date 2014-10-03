var _ = require('cloneextend')
  , admins = require('../models/admins')
  , debug = require('debug')('routes/admin')
  , ensureAuthenticated = require('./ensure-authenticated')

var routes = function(app, configuration) {

    app.get('/admin', ensureAuthenticated, function(req, res) {
        return res.status(400).redirect('/admin/list')
    })
    
    app.get('/admin/list', ensureAuthenticated, function(req, res) {
        var config = _.cloneextend(
            configuration,
            {
                isAuthenticated: true,
                layout: 'dashboard'
            }
        )
        admins.getList(req.user, function(error, results) {
            if (error) {
                config.isMessage = true
                var message = error.message
                if ('database' === error.type) { /* i.e. likely a database error */
                    res.status(500)
                    debug('Setting generic 500 error message')
                }
                config.noUsers = true
                config.message = {
                    title: 'Error!',
                    type: 'danger',
                    description: message
                }
            } else {
                config.noUsers = (!results || (results.length === 0))
                config.users = results
            }
            
            res.render('admin/list', config)
                
        })
    })
}

module.exports = routes