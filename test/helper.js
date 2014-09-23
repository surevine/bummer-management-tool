var server = require('./utils/xmpp-server')

var port = 3000
var application = null

var beforeSuite = function(done) {
    options = {
       debug: false,
       silent: ('development' === process.env.NODE_ENV) ? false : true,
       site: 'http://localhost:' + port
   }
   application = require('../index')

   server.startServer(function() {
       application.httpServer.listen(port, function() {
          done()
       })
   })
}

var afterSuite = function(done) {
    if (application.httpServer.close) {
        application.httpServer.close()
    }
    server.stopServer(done)
}

var beforeScenario = function(annotations, context) {}

module.exports = {
    beforeSuite: beforeSuite,
    afterSuite: afterSuite,
    beforeScenario: beforeScenario,
    port: port,
    baseUrl: 'http://localhost:' + port
}