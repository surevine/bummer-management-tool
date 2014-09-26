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
        res.render('user/', config)
    })

}

module.exports = routes