var passport = require('passport')
  , _ = require('cloneextend')
  , accountRoutes = require('./routes/account')

var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) { return next() }
    res.redirect('/login')
}

var routes = function(app, configuration) {
  
    app.get('/', function(req, res) {
        var config = _.cloneextend(
            configuration,
            {
                isAuthenticated: req.isAuthenticated(),
                notAuthenticated: !req.isAuthenticated(),
                showBanner: true
            }
        )
        res.render('index', config)
    })
    
    accountRoutes(app, configuration)
    
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
        res.render('login', configuration, ensureAuthenticated)
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
    
    app.get('/*', function(req, res) {
        var config = configuration
        var config = _.cloneextend(
            configuration,
            {
                isAuthenticated: req.isAuthenticated(),
                notAuthenticated: !req.isAuthenticated()
            }
        )
        res.status(404).end()
    })
        
}

module.exports = routes