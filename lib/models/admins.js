var storage = require('../storage')
  , xmpp = require('../xmpp')
  , debug = require('debug')('admins')

var getList = function(admin, callback) {
    debug('info', 'Fetching admin list for ' + admin.user + '@' + admin.domain)
    storage.getServerCredentials(admin, function(error, credentials) {
        if (error) {
            error.message = 'We experienced a server problem, apologies!'
            return callback(error)
        }
        if (!credentials) {
            return callback({
                message: 'You are not an admin and therefore can not obtain the admin list',
                type: 'authorisation'
            })
        }
        storage.getAdminList(admin.domain, function(error, admins) {
            callback(error, admins)
        })
    })
}

var serverProblem = function(error, callback) {
    error.message = 'We experienced a server problem, apologies!'
    error.type = 'database'
    return callback(error)
}

var add = function(admin, jid, callback) {
    debug('Adding an administrator', jid)
    if ('admin' === jid.user) {
        return callback({ message: 'Sorry, this is a restricted user' })   
    }
    if (!jid.user.match(/^[a-z0-9\_\-\.]{3,70}$/i)) {
        return callback({ message: 'You must enter a valid user name' })
    }
    storage.getServerCredentials(admin, function(error, credentials) {
        if (error) {
            return serverProblem(error, callback)
        }
        if (!credentials) {
            return callback({
                message: 'You are not an admin and therefore can not obtain the admin list',
                type: 'authorisation'
            })
        }
        storage.isAdmin(jid, function(error, isAdmin) {
            if (error) {
                return serverProblem(error, callback)
            }
            if (isAdmin) {
                return callback({
                    message: 'User is already an administrator',
                    type: 'user-exists'
                })
            }
            storage.addAdmin(jid, function(error, success) {
                if (error) {
                    return serverProblem(error, callback)
                }
                callback(null, true)
            })
        })
    })
}

var remove = function(admin, jid, callback) {
    debug('Removing an administrator', jid)
    if ('admin' === jid.user) {
        return callback({ message: 'Sorry, this is a restricted user' })   
    }
    if ((admin.user === jid.user) && (admin.domain === jid.domain)) {
        return callback({ message: 'You can not remove yourself as an administrator', type: 'remove-self' })
    }
    storage.getServerCredentials(admin, function(error, credentials) {
        if (error) {
            error.message = 'We experienced a server problem, apologies!'
            error.type = 'database'
            return callback(error)
        }
        if (!credentials) {
            return callback({
                message: 'You are not an admin and therefore can not obtain user details',
                type: 'authorisation'
            })
        }
        storage.getAdminCount(jid.domain, function(error, count) {
            if (error) {
                return serverProblem(error, callback)
            }

            if (count <= 1) {
                return callback({ message: 'There must be at least one administrator', type: 'remove-all' })
            }

            storage.removeAdmin(jid, function(error, success) {
                if (error) {
                    return serverProblem(error, callback)
                }
                callback(null, true)
            })
        })
    })
    
}

module.exports = {
    getList: getList,
    add: add,
    remove: remove
}