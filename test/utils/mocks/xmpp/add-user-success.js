var ltx = require('ltx')
  , Xmpp = require('../../xmpp-helper')

var sessionId = '1234567890987654321'

module.exports = function() {
    return [
        {
            validator: function(stanza) {
                var field = stanza.getChild('command').getChild('x').getChild('field')
                field.attrs.var.should.equal('accountjid')
                field.getChildText('value').should.equal('mrstrickland@localhost')
            },
            response: function() {
                return ltx.parse('' +
                    '<iq to="admin@localhost" from="localhost" type="result">' +
                    '<command xmlns="http://jabber.org/protocol/commands" ' +
                        'sessionid="1234567890987654321" ' +
                        'node="' + Xmpp.USER_ADD + '" status="executing">' +
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
                            'node="' + Xmpp.USER_ADD + '" status="completed">' +
                            '<x xmlns="jabber:x:data" type="form">' +
                                 '<field var="accountjid"/>' +
                            '</x>' +
                            '<note type="info">Added user mrstrickland@localhost</note>' +
                        '</command>' +
                    '</iq>'
                )
            }
        }
    ]
}