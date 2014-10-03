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

module.exports = {
    getList: getList
}