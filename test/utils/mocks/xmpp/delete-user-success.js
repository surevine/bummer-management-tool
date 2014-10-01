var ltx = require('ltx')
  , Xmpp = require('../../xmpp-helper')

var sessionId = '1234567890987654321'

module.exports = function() {
    return [
        {
            validator: function(stanza) {
                var field = stanza.getChild('command').getChild('x').getChild('field')
                field.attrs.var.should.equal('accountjid')
                field.getChildText('value').should.equal('docbrown@localhost')
            },
            response: function() {
                return ltx.parse('' +
                    '<iq to="admin@localhost" from="localhost" type="result">' +
                    '<command xmlns="http://jabber.org/protocol/commands" ' +
                        'sessionid="1234567890987654321" ' +
                        'node="' + Xmpp.USER_DELETE + '" status="executing">' +
                        '<x xmlns="jabber:x:data" type="form">' +
                            '<field var="accountjid" type="jid-single"/>' +
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
                            'node="' + Xmpp.USER_DELETE + '" status="completed">' +
                            '<x xmlns="jabber:x:data" type="form">' +
                                 '<field var="max_items" type="list-multi"><value>all</value></field>' +
                                 '<field var="userjid"/>' +
                            '</x>' +
                            '<note type="info">Deleted user linda@localhost</note>' +
                        '</command>' +
                    '</iq>'
                )
            }
        }
    ]
}