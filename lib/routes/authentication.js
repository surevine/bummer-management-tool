var passport = require('passport')
  , _ = require('cloneextend')
  , users = require('../models/users')
  , debug = require('debug')('routes/authentication')
  , ensureAuthenticated = require('./ensure-authenticated')

var routes = function(app, configuration) {
    
    app.get('/login', function(req, res) {
        var config = _.cloneextend(
            configuration,
            {
                isAuthenticated: false,
                notAuthenticated: true,
                layout: 'minimal',
                bodyClass: 'sign-in',
            }
        )
        if (req.param('auth-failed')) {
            config.messageType = 'danger'
            config.messageTitle = 'Oh no!'
            config.messageDescription = 'Username &/or password incorrect'
            config.isMessage = true
        }
        if (req.param('auth-required')) {
            config.messageType = 'warning'
            config.messageTitle = 'Hang on...'
            config.messageDescription = 'You need to be logged in to see this page'
            config.isMessage = true
        }
        res.render('login', config)
    })
    
    app.post('/login',
      passport.authenticate(
          'xmpp',
          {
              successRedirect: '/account',
              successFlash: 'Successful authentication, yey!',
              failureRedirect: '/login?auth-failed=true',
              failureFlash: 'Incorrect username &/or password'
          }
      ),
      function(req, res) {
        res.redirect('/users/' + req.user.username)
      }
    )
    
    app.get('/logout', function(req, res) {
        req.logout()
        res.redirect('/')
    })
    
}

module.exports = routes