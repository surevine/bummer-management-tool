var debug = require('debug')('mock')

var config = null

var setConfiguration = function(configuration) {
    debug('Setting database responses', configuration)
    config = configuration
}
            
var getServerCredentials = function(jid, callback) {
    var response = config.shift()
    debug('Returning mock data (getServerCredentials)', 'error:', response.error, 'data:', response.data)
    callback(response.error, response.data)
}

var getAdminList = function(domain, callback) {
    var response = config.shift()
    debug('Returning mock data (getAdminList)', 'error:', response.error, 'data:', response.data)
    callback(response.error, response.data)
}

module.exports = {
    setConfiguration: setConfiguration,
    getServerCredentials: getServerCredentials,
    getAdminList: getAdminList
}