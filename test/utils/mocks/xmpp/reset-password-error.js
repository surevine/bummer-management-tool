var ltx = require('ltx')
  , Xmpp = require('../../xmpp-helper')

var sessionId = '1234567890987654321'

module.exports = function() {
    return [
        {
            validator: function(stanza) {
                var fields = stanza.getChild('command').getChild('x').getChildren('field')
                fields[0].attrs.var.should.equal('accountjid')
                fields[0].getChildText('value').should.equal('docbrown@localhost')
                fields[1].attrs.var.should.equal('password')
                fields[1].getChildText('value').should.match(
                    /^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/i
                )
            },
            response: function() {
                return ltx.parse('' +
                    '<iq to="admin@localhost" from="localhost" type="result">' +
                    '<command xmlns="http://jabber.org/protocol/commands" ' +
                        'sessionid="1234567890987654321" ' +
                        'node="' + Xmpp.CHANGE_USER_PASSWORD + '" status="executing">' +
                        '<x xmlns="jabber:x:data" type="form">' +
                            '<field var="accountjid" type="jid-single"/>' +
                            '<field var="password" type="text-private"/>' +
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
                            'node="' + Xmpp.CHANGE_USER_PASSWORD + '" status="completed">' +
                            '<x xmlns="jabber:x:data" type="form">' +
                                 '<field var="accountjid"/>' +
                                 '<field var="password"/>' +
                            '</x>' +
                            '<note type="error">Could not reset user password</note>' +
                        '</command>' +
                    '</iq>'
                )
            }
        }
    ]
}