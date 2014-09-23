'use strict';

var   express        = require('express')
    , app            = express()
    , exphbs         = require('express-handlebars')
    , helmet         = require('helmet')
    , bodyParser     = require('body-parser')
    , methodOverride = require('method-override')
    , errorHandler   = require('errorhandler')
    , passport       = require('passport')
    , config         = require('./lib/config')
    , session        = require('express-session')
    , flash          = require('connect-flash')
    , XmppStrategy   = require('passport-xmpp')

require('colors')

var port = process.argv[2] || 3000

helmet(app)

var server = require('http').createServer(app)

app.disable('x-powered-by')
app.use(express.static(__dirname + '/public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(session({
    secret: config.cookie.secret,
    saveUninitialized: true,
    resave: true
}))
app.use(flash())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride())
app.set('strict routing', false)
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(passport.initialize())
app.use(passport.session())
passport.use(new XmppStrategy())

require('./lib/routes')(app, {})

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null, user)
})

if (process.mainModule === module) {
    app.listen(port)
    console.log(('Server started and listening on port ' + port).green)
} else {
    exports.httpServer = app
}