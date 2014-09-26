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
    .c('field', { var: 'accountjids', type: 'jid-single' }).c('value').t('docbrown@localhost')

module.exports = function() {
    return [
        {
            response: function() {
                return ltx.parse('' +
                    '<iq to="admin@localhost" from="localhost" type="result">' +
                    '<command xmlns="http://jabber.org/protocol/commands" ' +
                        'sessionid="1234567890987654321" ' +
                        'node="' + Xmpp.USER_STATS + '" status="executing">' +
                        '<x xmlns="jabber:x:data" type="form">' +
                            '<field var="accountjid" type="jid-single"><value>docbrown@localhost</value></field>' +
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
                            'node="' + Xmpp.USER_STATS + '" status="completed">' +
                            '<x xmlns="jabber:x:data" type="form">' +
                                 '<field var="accountjid" type="jid-single"><value>docbrown@localhost</value></field>' +
                                 '<field var="ipaddresses" type="text-multi">' +
                                     '<value>1.1.1.1</value>' +
                                     '<value>2.2.2.2</value>' +
                                     '<value>3.3.3.3</value>' +
                                     '<value>4.4.4.4</value>' +
                                     '<value>5.5.5.5</value>' +
                                 '</field>' +
                                 '<field var="rostersize" type="text-single" label="Roster size">' +
                                     '<value>41</value>' +
                                 '</field>' +
                                 '<field var="onlineresources" type="text-multi" label="Online Resources">' +
                                     '<value>delorean</value>' +
                                     '<value>mid-west</value>' +
                                     '<value>hill-valley-high-school</value>' +
                                     '<value>9309-lyon-estates</value>' +
                                     '<value>lab</value>' +
                                 '</field>' +
                            '</x>' +
                        '</command>' +
                    '</iq>'
                )
            }
        }
    ]
}