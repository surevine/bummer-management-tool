var _ = require('cloneextend')
  , users = require('../models/users')
  , debug = require('debug')('routes/user')
  , ensureAuthenticated = require('./ensure-authenticated')

var routes = function(app, configuration) {

    app.get('/user', ensureAuthenticated, function(req, res) {
        return res.status(404).redirect('/account/users')
    })
    
    app.get('/user/:jid', ensureAuthenticated, function(req, res) {
        if (!req.param('jid')) {
            return res.status(404).redirect('/account/users')
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
    
    app.get('/user/end-session', ensureAuthenticated, function(req, res) {
        if (!req.param('jid')) {
            return res.status(404).redirect('/account/users')
        }
    })

}

module.exports = routes