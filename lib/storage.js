var pg = require('pg')
  , debug = require('debug')('storage')

var storage = null

var setConfiguration = function(configuration) {
    var storageType = configuration.type.replace(/[^a-z0-9]\-\_/gi, '')
    try {
        storage = require('./storage/' + storageType)
        storage.setConfiguration(configuration)
    } catch (e) {
        throw new Error('Storage type \'' + storageType + '\' not supported')
    }
}

var getServerCredentials = function(jid, callback) {
    storage.getServerCredentials(jid, callback)
}

var getAdminList = function(domain, callback) {
    storage.getAdminList(domain, callback)
}

var isAdmin = function(jid, callback) {
    var jid = jid.user + '@' + jid.domain
    storage.isAdmin(jid, callback)
}

var addAdmin = function(jid, callback) {
    var domain = jid.domain
    var jid = jid.user + '@' + jid.domain
    storage.addAdmin(jid, domain, callback)
}

module.exports = {
    setConfiguration: setConfiguration,
    getServerCredentials: getServerCredentials,
    getAdminList: getAdminList,
    isAdmin: isAdmin,
    addAdmin: addAdmin
}