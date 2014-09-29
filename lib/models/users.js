var storage = require('../storage')
  , xmpp = require('../xmpp')
  , debug = require('debug')('users')

var getUsers = function(admin, callback) {
    debug('info', 'Fetching users for ' + admin.user + '@' + admin.domain)
    storage.getServerCredentials(admin, function(error, credentials) {
        if (error) {
            error.message = 'We experienced a server problem, apologies!'
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

var endSession = function(admin, jid, callback) {
    debug('Ending user session', jid)
    if ('admin' === jid.user) {
        return callback({ message: 'Sorry, this is a restricted user' })   
    }
    storage.getServerCredentials(admin, function(error, credentials) {
        if (error) {
            error.message = 'We experienced a server problem, apologies!'
            error.type = 'database'
            return callback(error)
        }
        debug('trace', 'Connect to XMPP server using', credentials)
        if (!credentials) {
            return callback({
                message: 'You are not an admin and therefore can not obtain user details',
                type: 'authorisation'
            })
        }
        xmpp.endSession(credentials, jid, function(error, success) {
            if (error) {
                error.type = 'xmpp'
                if ('XMPP authentication failure' === error.message) {
                    error.message = 'Could not access your XMPP account, please contact support'
                }
            }
            callback(error, success)
        })
    })
}

var createUser = function(admin, options, callback) {
    debug('Creating new user', options)
    if ('admin' === options.jid.user) {
        return callback({ message: 'Sorry, this is a restricted user' })   
    }
    storage.getServerCredentials(admin, function(error, credentials) {
        if (error) {
            error.message = 'We experienced a server problem, apologies!'
            error.type = 'database'
            return callback(error)
        }
        debug('trace', 'Connect to XMPP server using', credentials)
        if (!credentials) {
            return callback({
                message: 'You are not an admin and therefore can not obtain user details',
                type: 'authorisation'
            })
        }
        xmpp.createUser(credentials, options, function(error, success) {
            if (error) {
                if ('xmpp-adding' === error.type) {
                    error.message = 'Error adding user, please contact support'
                } else if ('user-exists' === error.type) {
                    error.message = 'User already exists'
                } else if ('XMPP authentication failure' === error.message) {
                    error.message = 'Could not access your XMPP account, please contact support'
                }
                error.type = 'xmpp'
            }
            callback(error, success)
        })
    })
}

module.exports = {
    getUsers: getUsers,
    getOnlineResources: getOnlineResources,
    endSession: endSession,
    createUser: createUser
}