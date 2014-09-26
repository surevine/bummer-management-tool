var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .then('I see the user information page', function() {
            var jid = this.params.jid
            this.driver.element('h1.page-header').text(function(text) {
                text.should.equal('User information page for ' + jid)  
            })
        })
    
    return library
})()