var debug = require('debug')('mock')

var config = null

var setConfiguration = function(configuration) {
    debug('Setting database responses', configuration)
    config = configuration
}

var _returnResponse = function(callback, caller) {
    var response = config.shift()
    debug('Returning mock data (' + caller + ')', 'error:', response.error, 'data:', response.data)
    callback(response.error, response.data)
}
            
var getServerCredentials = function(jid, callback) {
    _returnResponse(callback, 'getServerCredentials')
}

var getAdminList = function(domain, callback) {
    _returnResponse(callback, 'getAdminList')
}

var isAdmin = function(jid, callback) {
    _returnResponse(callback, 'isAdmin')
}

var addAdmin = function(jid, domain, callback) {
    _returnResponse(callback, 'addAdmin')
}

var removeAdmin = function(jid, domain, callback) {
    _returnResponse(callback, 'removeAdmin')
}

var getAdminCount = function(domain, callback) {
    _returnResponse(callback, 'getAdminCount')
}

module.exports = {
    setConfiguration: setConfiguration,
    getServerCredentials: getServerCredentials,
    getAdminList: getAdminList,
    isAdmin: isAdmin,
    addAdmin: addAdmin,
    removeAdmin: removeAdmin,
    getAdminCount: getAdminCount
}