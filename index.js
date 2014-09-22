'use strict';

var   express        = require('express')
    , app            = express()
    , exphbs         = require('express-handlebars')
    , helmet         = require('helmet')
    , bodyParser     = require('body-parser')
    , methodOverride = require('method-override')
    , errorHandler   = require('errorhandler')

var port = process.argv[2] || 3000

helmet(app)

var server = require('http').createServer(app)
server.listen(port)
console.log('Server started and listening on port ' + port)

app.disable('x-powered-by')
app.use(express.static(__dirname + '/public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride())
app.set('strict routing', false)
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars'); 

require('./lib/routes')(app, {})