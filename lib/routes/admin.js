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
        if (req.param('admin-removed')) {
            switch (req.param('admin-removed')) {
                default:
                case 'remove-self':
                    config.message = {
                        type: 'danger',
                        description: 'You can not remove yourself as an administrator',
                        title: 'Hold on!'
                    }
                    break
                case 'remove-all':
                    config.message = {
                        type: 'danger',
                        description: 'There must be at least one administrator',
                        title: 'Stop!'
                    }
                    break
                case 'false':
                    config.message = {
                        type: 'danger',
                        description: 'Administrator could not be removed',
                        title: 'Error!'
                    }
                    break
                case 'true':
                    config.message = {
                        type: 'success',
                        description: 'Administrator was removed successfully',
                        title: 'Great!'
                    }
                    break
            }
        }
        if (config.message) {
            config.isMessage = true
        }
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
    
    app.get(/\/admin\/remove\/?(.*)/, ensureAuthenticated, function(req, res) {
        
        if (!req.params[0]) {
            return res.status(400).redirect('/admin/list')
        }

        var jid = new JID(req.params[0])
        if (!jid.getLocal() || (jid.getDomain() !== req.user.domain) || jid.getResource()) {
            return res.status(400).redirect('/admin/list')
        }
        
        var path = '/admin/list'          

        admins.remove(req.user, jid, function(error, success) {
            var status = 200
                        
            if (error) {
                status = 500
                switch (error.type) {
                    case 'remove-self':
                    case 'remove-all':
                        path += '?admin-removed=' + error.type
                        break
                    default:
                        path += '?admin-removed=false'
                        break
                }
            } else {
                path += '?admin-removed=true'
            }
                
            res.status(status).redirect(path)
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
            admins.add(req.user, jid, function(error, success) {
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