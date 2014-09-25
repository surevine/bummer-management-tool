var ltx = require('ltx')

var from = null

module.exports = [
    {
          validator: function(stanza) {
              stanza.is('iq').should.be.true
              stanza.attrs.to.should.equal('localhost')
              stanza.attrs.from.should.containEql('admin@localhost')
              stanza.attrs.type.should.equal('set')
              var command = stanza.getChild('command', 'http://jabber.org/protocol/commands')
              command.should.exist
              command.attrs.node.should.equal('http://jabber.org/protocol/admin#get-user-list')
              command.attrs.action.should.equal('execute')
              var x = command.getChild('x', 'jabber:x:data')
              x.should.exist
              x.attrs.type.should.equal('submit')
              var fields = x.getChildren('field')
              fields.length.should.equal(1)
              fields[0].attrs.var.should.equal('max_items')
              fields[0].getChildText('value').should.equal('all')
          },
          response: function() {
              var stanza = new ltx.Element(
                  'iq',
                  { to: 'admin@localhost', from: 'localhost', type: 'error' }
              )
              stanza.c('error', { type: 'cancel' })
                  .c('service-unavailable', { xmlns: 'urn:ietf:params:xml:ns:xmpp-stanzas' })
              return stanza
          }
    }
    
]