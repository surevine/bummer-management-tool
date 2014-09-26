var ltx = require('ltx')
  , Xmpp = require('../../xmpp-helper')

var sessionId = '1234567890987654321'

module.exports = function() {
    return [
        {
            response: function() {
                return ltx.parse('' +
                    '<iq to="admin@localhost" from="localhost" type="result">' +
                    '<command xmlns="http://jabber.org/protocol/commands" ' +
                        'sessionid="1234567890987654321" ' +
                        'node="' + Xmpp.USER_LIST + '" status="executing">' +
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
                            'node="' + Xmpp.USER_LIST + '" status="completed">' +
                            '<x xmlns="jabber:x:data" type="form">' +
                                 '<field var="max_items" type="list-multi"><value>all</value></field>' +
                                 '<field var="userjids">' +
                                     '<value>docbrown@localhost</value>' +
                                     '<value>marty@localhost</value>' +
                                     '<value>einstein@localhost</value>' +
                                     '<value>biff@localhost</value>' +
                                     '<value>george@localhost</value>' +
                                     '<value>admin@localhost</value>' +
                                     '<value>marvin@localhost</value>' +
                                     '<value>strickland@localhost</value>' +
                                     '<value>goldie@localhost</value>' +
                                     '<value>sherman@localhost</value>' +
                                     '<value>linda@localhost</value>' +
                                     '<value>jennifer@localhost</value>' +
                                 '</field>' +
                            '</x>' +
                        '</command>' +
                    '</iq>'
                )
            }
        }
    ]
}