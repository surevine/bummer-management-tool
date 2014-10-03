var _ = require('cloneextend')
  , admins = require('../models/admins')
  , debug = require('debug')('routes/admin')
  , ensureAuthenticated = require('./ensure-authenticated')
  , JID = require('node-xmpp-core').JID

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
    
    app.post('/admin/add', ensureAuthenticated, function(req, res) {
        
        var regexMatch = /^[a-z0-9\-\_\.]{3,70}$/i
        
        var config = _.cloneextend(
            configuration,
            {
                isAuthenticated: true,
                notAuthenticated: false,
                pageTitle: '- Add User',
                layout: 'dashboard',
                domain: req.user.domain
            }
        )
        var jid =  new JID(req.param('local'), req.user.domain)
        if (!config.isMessage) {
            admins.addAdministrator(req.user, jid, function(error, success) {
                config.isMessage = true
                if (error) {
                    config.message = {
                        type: 'danger',
                        description: error.message,
                        title: 'Error!'
                    }
                } else {
                    config.user = jid
                    config.message = {
                        type: 'success',
                        title: 'Horray!',
                        description: 'User has been added to list of administrators'
                    }
                }
                res.render('admin/add', config)
            })
        } else {
            res.render('admin/add', config)
        }
    })
    
    app.get('/admin/add', ensureAuthenticated, function(req, res) {

        var config = _.cloneextend(
            configuration,
            {
                isAuthenticated: true,
                notAuthenticated: false,
                pageTitle: '- Add Admin',
                layout: 'dashboard',
                domain: req.user.domain
            }
        )
        res.render('admin/add', config)
        
    })
}

module.exports = routes