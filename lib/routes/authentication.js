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
                bodyClass: 'sign-in'
            }
        )
        res.render('login', config)
    })
    
    app.post('/login',
      passport.authenticate(
          'xmpp',
          {
              successRedirect: '/account',
              successFlash: 'Successful authentication, yey!',
              failureRedirect: '/login',
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