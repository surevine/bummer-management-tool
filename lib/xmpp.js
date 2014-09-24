var Client = require('node-xmpp-client')
  , ltx    = require('ltx')
  , debug  = require('debug')('xmpp')

var commandNamespace = 'http://jabber.org/protocol/commands'
  , formNamespace = 'jabber:x:data'

var _connect = function(credentials, callback) {
    var options = {
        jid: credentials.jid,
        password: credentials.password
    }
    if (process.env.XMPP_HOST) {
        options.host = process.env.XMPP_HOST
    }
    var client = new Client(options)
    client.on('online', function(data) {
        debug('info', 'Successfully connected as', data)
        callback(null, client)  
    })
    client.on('error', function(error) {
        callback({ message: error })
    })
}

var _extractDataFromForm = function(command, fieldVar) {
    var x = command.getChild('x', formNamespace)
    var data = []
    x.getChildren('field').forEach(function(field) {
        if (field.attrs.var !== fieldVar) return
        field.getChildren('value').forEach(function(value) {
            data.push(value.getText())
        })
    })
    return data
}

var getUsers = function(credentials, callback) {
   _connect(credentials, function(error, client) {
       if (error) return callback(error)
       var getUsersStanza = new ltx.Element('iq', { type: 'set', to: credentials.domain })
       getUsersStanza.c(
           'command',
           {
               xmlns: commandNamespace,
               node: 'http://jabber.org/protocol/admin#get-user-list',
               action: 'execute'
           }
       ).c('x', { xmlns: formNamespace, type: 'submit' })
           .c('field', { var: 'max_items' }).c('value').t('all')
       
       client.on('stanza', function(stanza) {
           if (stanza.attrs.type === 'error') {
               client.end()
               callback({ message: 'Error retrieving user data' })
           }
           var command = stanza.getChild('command', commandNamespace)
           if (!command) return
           if ('executing' === command.getAttr('status')) {
               getUsersStanza.getChild('command').attr('sessionid', command.attrs.sessionid)
               return client.send(getUsersStanza)
           }
           if ('completed' === command.getAttr('status')) {
               client.end()
               callback(null, _extractDataFromForm(command, 'userjids'))
           }
       })
       client.send(getUsersStanza)
   })
}

module.exports = {
    getUsers: getUsers
}