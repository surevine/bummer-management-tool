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
                requestForm.root().getChild('command').attr('status', 'executing')
                return requestForm
            }
        },
        {
            validator: function(stanza) {
                stanza.getChild('command', Xmpp.NS_COMMANDS).attrs.sessionid.should.equal(sessionId)
            },    
            response: function() {
                var result = command.getChild('x')
                    .c('field', { var: 'userjids' })
                result.c('value').t('docbrown@localhost')
                result.c('value').t('marty@localhost')
                result.c('value').t('einstein@localhost')
                result.c('value').t('jennifer@localhost')
                result.c('value').t('biff@localhost')
                result.c('value').t('george@localhost')
                result.c('value').t('admin@localhost')
                result.root().getChild('command').attr('status', 'completed')
                return result
            }
        }
    ]
}