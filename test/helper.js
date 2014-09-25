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
    if (annotations.database) {
        storage.setConfiguration(require('./utils/mocks/storage/' + annotations.database))   
    }
    var stanzas = annotations.xmpp ? require('./utils/mocks/xmpp/' + annotations.xmpp) : []
    server.setStanzas(stanzas)
}

module.exports = {
    beforeSuite: beforeSuite,
    afterSuite: afterSuite,
    beforeScenario: beforeScenario,
    port: port,
    baseUrl: 'http://localhost:' + port
}