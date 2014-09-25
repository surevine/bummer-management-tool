var ltx = require('ltx')
  , Xmpp = require('../../xmpp-helper')

var sessionId = '1234567890987654321'

var response = new ltx.Element(
    'iq',
    { to: 'admin@localhost', from: 'localhost', type: 'result' }
)
var command = response.c(
    'command',
    {
        xmlns: Xmpp.NS_COMMANDS,
        sessionid: sessionId,
        node: Xmpp.USER_LIST,
        status: 'executing'
    }
)
var requestForm = command.c('x', { xmlns: Xmpp.NS_DATA_FORM, type: 'form' })
    .c('field', { var: 'max_items', type: 'list-multi' }).c('value').t('all')

module.exports = function() {
    return [
        {
            response: function() {
                return ltx.parse('' +
                    '<iq to="admin@localhost" from="localhost" type="result">' +
                    '<command xmlns="http://jabber.org/protocol/commands" ' +
                        'sessionid="1234567890987654321" ' +
                        'node="http://jabber.org/protocol/admin#get-user-list" status="executing">' +
                        '<x xmlns="jabber:x:data" type="form">' +
                            '<field var="max_items" type="list-multi"><value>all</value></field>' +
                        '</x>' +
                    '</command>' +
                    '</iq>'
                )
            }
        },
        {
            validator: function(stanza) {
                stanza.getChild('command', Xmpp.NS_COMMANDS).attrs.sessionid.should.equal(sessionId)
            },    
            response: function() {
                return ltx.parse('' +
                    '<iq to="admin@localhost" from="localhost" type="result">' +
                        '<command xmlns="http://jabber.org/protocol/commands" ' +
                            'sessionid="1234567890987654321" ' +
                            'node="http://jabber.org/protocol/admin#get-user-list" status="completed">' +
                            '<x xmlns="jabber:x:data" type="form">' +
                                 '<field var="max_items" type="list-multi"><value>all</value></field>' +
                                 '<field var="userjids">' +
                                     '<value>docbrown@localhost</value>' +
                                     '<value>marty@localhost</value>' +
                                     '<value>einstein@localhost</value>' +
                                     '<value>biff@localhost</value>' +
                                     '<value>george@localhost</value>' +
                                     '<value>admin@localhost</value>' +
                                 '</field>' +
                            '</x>' +
                        '</command>' +
                    '</iq>'
                )
            }
        }
    ]
}