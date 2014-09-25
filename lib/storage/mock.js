var debug = require('debug')('mock')

var config = null

var setConfiguration = function(configuration) {
    config = configuration
}
            
var getServerCredentials = function(jid, callback) {
    var response = config.shift()
    callback(response.error, response.data)
}

module.exports = {
    setConfiguration: setConfiguration,
    getServerCredentials: getServerCredentials
}