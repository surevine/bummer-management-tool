var storage = require('../storage')
  , xmpp = require('../xmpp')
  , debug = require('debug')('users')

var getUsers = function(jid, callback) {
    debug('info', 'Fetching users for ' + jid.user + '@' + jid.domain)
    storage.getServerCredentials(jid, function(error, credentials) {
        if (error) {
            error.message = 'We experienced a server problem, apologies!'
            error.serverError = true
            return callback(error)
        }
        debug('trace', 'Connect to XMPP server using', credentials)
        if (!credentials) {
            return callback({ message: 'You are not an admin and therefore can not obtain user details' })
        }
        xmpp.getUsers(credentials, function(error, users) {
            if (error && ('XMPP authentication failure' === error.message)) {
                error.message = 'Could not access your XMPP account, please contact support'
            }
            callback(error, users)
        })
    })
}

module.exports = {
    getUsers: getUsers
}