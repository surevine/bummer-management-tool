var server = require('./utils/xmpp-server')
  , storage = require('../lib/storage/mock')

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

var beforeScenario = function(annotations, context) {
    var databaseActions = []
    if (annotations.database) {
        annotations.database.split(',').forEach(function(database) {
            databaseActions.concat(require('./utils/mocks/storage/' + database)())
        })
        
    }
    storage.setConfiguration(databaseActions)
    var xmppActions = []
    if (annotations.xmpp) {
        annotations.xmpp.split(',').forEach(function(xmpp) {
            xmppActions.concat(require('./utils/mocks/xmpp/' + xmpp)())
        })
        
    }
    server.setStanzas(xmppActions)
}

module.exports = {
    beforeSuite: beforeSuite,
    afterSuite: afterSuite,
    beforeScenario: beforeScenario,
    port: port,
    baseUrl: 'http://localhost:' + port
}