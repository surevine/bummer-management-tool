var storage = require('../storage')
  , xmpp = require('../xmpp')
  , debug = require('debug')('users')

var getUsers = function(admin, callback) {
    debug('info', 'Fetching users for ' + admin.user + '@' + admin.domain)
    storage.getServerCredentials(admin, function(error, credentials) {
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
            if (error) {
                if ('XMPP authentication failure' === error.message) {
                    error.message = 'Could not access your XMPP account, please contact support'
                }
            } else {
                users.forEach(function(user, index) {
                    if (0 === user.indexOf('admin@')) {
                        users.splice(index, 1)
                    }
                })
            }
            callback(error, users)
        })
    })
}

var getOnlineResources = function(admin, jid, callback) {
    debug('info', 'Fetching online resources of ' + jid)
    if (0 === jid.indexOf('admin@')) {
        return callback({ message: 'Sorry, this is a restricted user' })   
    }
    storage.getServerCredentials(admin, function(error, credentials) {
        if (error) {
            error.message = 'We experienced a server problem, apologies!'
            error.serverError = true
            return callback(error)
        }
        debug('trace', 'Connect to XMPP server using', credentials)
        if (!credentials) {
            return callback({ message: 'You are not an admin and therefore can not obtain user details' })
        }
        xmpp.getOnlineResources(credentials, jid, function(error, userDetails) {
            if (error) {
                if ('XMPP authentication failure' === error.message) {
                    error.message = 'Could not access your XMPP account, please contact support'
                }
            }
            callback(error, userDetails)
        })
    })
}

module.exports = {
    getUsers: getUsers,
    getOnlineResources: getOnlineResources
}