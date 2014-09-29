var pg = require('pg')
  , debug = require('debug')('postgresql')

var config = null

var setConfiguration = function(configuration) {
    config = configuration.postgresql
    
    var username = config.username
    var password = config.password
    var host = config.host || 'localhost'
    var port = config.port || 5432
    var database = config.database
    config.connectionString = 'postgres://' + username +
        ':' + password + '@' + host +
        ':' + port + '/' + database
}

var _getInstance = function(callback) {
    pg.connect(config.connectionString, function(error, client, done) {
        if (error) {
            debug('Error connecting to database', error)
            done()
            error.type = 'database'
            callback(error)
            return
        }
        debug('trace', 'Have database connection from pool')
        callback(null, client, done)
    })
}
               
var getServerCredentials = function(jid, callback) {
    _getInstance(function(error, client, done) {
        if (error) {
            error.message = 'We experienced a server problem, apologies!'
            error.type = 'database'
            return callback(error)
        }
        var query = 'SELECT "accounts"."jid", "accounts"."password", "accounts"."domain" FROM ' +
            '"accounts" AS "accounts", "admins" AS "admins" WHERE ' +
            '"accounts"."domain" = $1 ' +
            'AND "accounts"."domain" = "admins"."domain" ' +
            'AND "admins"."jid" = $2;'
        var data = [ jid.domain, jid.user + '@' + jid.domain ]
        client.query(query, data, function(error, result) {
            debug('trace', 'Run query: ' + query, data, error, result)
            done()
            if (error) {
                error.type = 'database'
                return callback(error)
            }
            callback(null, result.rows[0])
        })
    })
}

module.exports = {
    setConfiguration: setConfiguration,
    getServerCredentials: getServerCredentials
}