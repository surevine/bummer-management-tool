var _ = require('cloneextend')
  , users = require('../models/users')
  , debug = require('debug')('routes/user')
  , ensureAuthenticated = require('./ensure-authenticated')
  , JID = require('../utils/jid')
  , generatePassword = require('../utils/password')

var routes = function(app, configuration) {

    app.get('/user', ensureAuthenticated, function(req, res) {
        return res.status(400).redirect('/account/users')
    })
    
    app.get(/\/user\/end\-session\/?(.*)/, ensureAuthenticated, function(req, res) {
        if (!req.params[0]) {
            return res.status(400).redirect('/account/users')
        }

        var jid = new JID(req.params[0])
        if (!jid.getLocal() || (jid.getDomain() !== req.user.domain)) {
            return res.status(400).redirect('/account/users')
        }
        
        users.endSession(req.user, jid, function(error, success) {
            var status = 200
            var path = '/user/' + jid.getLocal() + '@' + jid.getDomain() + '?'
            if (error) {
                status = 500
                switch (error.type) {
                    case 'database':
                        path += 'server-error=true'
                        break
                    case 'xmpp':
                        path += 'xmpp-error=true'
                        break
                    case 'authorisation':
                        path += 'authorisation-fail=true'
                        break
                    default:
                        path += 'error=true'
                        break
                }
            } else {
                path += 'session-cleared=true'
            }
                
            res.status(status).redirect(path)
        })
        
    })
    
    app.get(/\/user\/delete\/?(.*)/, ensureAuthenticated, function(req, res) {
        
        if (!req.params[0]) {
            return res.status(400).redirect('/account/users')
        }

        var jid = new JID(req.params[0])
        if (!jid.getLocal() || (jid.getDomain() !== req.user.domain) || jid.getResource()) {
            return res.status(400).redirect('/account/users')
        }
        
        var path = '/user/' + jid.getLocal() + '@' + jid.getDomain()
        var referrer = req.get('referrer') || ''
        if (-1 !== referrer.indexOf('account/users')) {
            path = '/account/users'          
        }
        
        users.deleteUser(req.user, jid, function(error, success) {
            var status = 200
                        
            if (error) {
                status = 500
                path += '?user-deleted=false'
            } else {
                path = '/account/users?user-deleted=true'
            }
                
            res.status(status).redirect(path)
        })
        
    })
    
    app.post('/user/add', ensureAuthenticated, function(req, res) {
        
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
        var options = {
            jid: new JID(req.param('local'), req.user.domain),
            password: generatePassword()
        }
        if (!config.isMessage) {
            users.createUser(req.user, options, function(error, success) {
                if (error) {
                    config.isMessage = true
                    config.message = {
                        type: 'danger',
                        description: error.message,
                        title: 'Error!'
                    }
                } else {
                    config.user = options
                    config.isMessage = true
                    config.success = true
                    config.message = {
                        type: 'success',
                        title: 'Horray!',
                        description: 'User has been created, see below for details'
                    }
                }
                res.render('user/add', config)
            })
        } else {
            res.render('user/add', config)
        }
    })
    
    app.get('/user/add', ensureAuthenticated, function(req, res) {

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
        res.render('user/add', config)
        
    })
    
    app.get(/\/user\/password-reset\/?(.*)/, ensureAuthenticated, function(req, res) {
        
        if (!req.params[0]) {
            return res.json({ error: 'No JID provided' })
        }

        var jid = new JID(req.params[0])
        if (!jid.getLocal() || (jid.getDomain() !== req.user.domain) || jid.getResource()) {
            return res.json({ error: 'Invalid JID provided' })
        }
        var options = {
            jid: jid,
            password: generatePassword()
        }
        users.resetPassword(req.user, options, function(error, success) {
            var response = {}
            if (error) {
                var message = 'Unable to reset password'
                switch (error.type) {
                    case 'restricted':
                        message = 'Sorry, this is a restricted user'
                        break
                }
                response.error = message
                response.details = error
            } else {
                response.password = options.password
            }
            return res.json(response)   
        })
        
    })
    
    app.get('/user/:jid', ensureAuthenticated, function(req, res) {
        if (!req.param('jid')) {
            return res.status(400).redirect('/account/users')
        }
        
        var jid = encodeURI(req.param('jid'))
        var config = _.cloneextend(
            configuration,
            {
                isAuthenticated: true,
                notAuthenticated: false,
                pageTitle: '- User page for ' + jid,
                jid: jid,
                layout: 'dashboard'
            }
        )
        
        if (req.param('user-deleted')) {
            switch (req.param('user-deleted')) {
                default:
                case 'false':
                    config.message = {
                        type: 'danger',
                        description: 'User could not be deleted',
                        title: 'Error!'
                    }
                    break
                case 'true':
                    config.message = {
                        type: 'success',
                        description: 'User account was deleted',
                        title: 'Success!'
                    }
                    break
            }
        } else if (req.param('server-error')) {
            config.message = {
                type: 'danger',
                description: 'We experienced a server problem, apologies!',
                title: 'Error!'
            } 
        } else if (req.param('authorisation-fail')) {
            config.message = {
                type: 'danger',
                description: 'You are not an admin and therefore can not obtain user details',
                title: 'Error!'
            }
        } else if (req.param('xmpp-error')) {
            config.message = {
                type: 'danger',
                description: 'Error retrieving user information, please contact support',
                title: 'Error!'
            }
        } else if (req.param('error')) {
            config.message = {
                type: 'danger',
                description: 'Something went wrong, please try again',
                title: 'Error!'
            }
        } else if (req.param('session-cleared')) {
            config.message = {
                type: 'success',
                description: 'Session(s) ended successfully',
                title: 'Success!'
            }
        }
        if (config.message) {
            config.isMessage = true
        }
        users.getOnlineResources(req.user, jid, function(error, userData) {
            if (error) {
                config.isMessage = true
                config.message = {
                    type: 'danger',
                    description: error.message,
                    title: 'Error!'
                }
            } else {
                config.userData = userData
                config.userData.forEach(function(data, index) {
                    config.userData[index].jid = jid  
                })
            }
            config.noUserData = (!userData || (0 === userData.length))
                
            res.render('user/', config)
        })
    })
    
}

module.exports = routes