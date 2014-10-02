var ltx = require('ltx')
  , Xmpp = require('../../xmpp-helper')

var from = null

module.exports = function() {
    return [
        {
              validator: function(stanza) {
                  stanza.is('iq').should.be.true
                  stanza.attrs.to.should.equal('localhost')
                  stanza.attrs.from.should.containEql('admin@localhost')
                  stanza.attrs.type.should.equal('set')
                  var command = stanza.getChild('command', Xmpp.NS_COMMANDS)
                  command.should.exist
                  command.attrs.node.should.equal(Xmpp.CHANGE_USER_PASSWORD)
                  command.attrs.action.should.equal('execute')
                  var x = command.getChild('x', Xmpp.NS_DATA_FORM)
                  x.should.exist
                  x.attrs.type.should.equal('submit')
                  var fields = x.getChildren('field')
                  fields.length.should.equal(2)
                  fields[0].attrs.var.should.equal('accountjid')
                  fields[0].getChildText('value').should.equal('docbrown@localhost')
                  fields[1].attrs.var.should.equal('password')
                  fields[1].getChildText('value').should.match(/^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/i)
              },
              response: function() {
                  var stanza = new ltx.Element(
                      'iq',
                      { to: 'admin@localhost', from: 'localhost', type: 'error' }
                  )
                  stanza.c('error', { type: 'cancel' })
                      .c('service-unavailable', { xmlns: Xmpp.NS_ERROR_STANZA })
                  return stanza
              }
        }
    ]
}