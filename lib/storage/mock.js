var debug = require('debug')('mock')

var config = null

var setConfiguration = function(configuration) {
    config = configuration
}
            
var getServerCredentials = function(jid, callback) {
    var response = config.shift()
    debug('Returning mock data', 'error:', response.error, 'data:', response.data)
    callback(response.error, response.data)
}

module.exports = {
    setConfiguration: setConfiguration,
    getServerCredentials: getServerCredentials
}