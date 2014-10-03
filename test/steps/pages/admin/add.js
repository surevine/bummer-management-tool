var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .then('I see the add admin page', function() {
            this.driver.element('h1.page-header').text(function(header) {
                header.should.equal('Add Administrator')
            })
            this.driver.element('strong.post-label').text(function(domain) {
                domain.should.equal('@ localhost')
            })
            this.driver.element('input[name="local"]')
            this.driver.element('button.add-admin').then(
                function() {},
                function() { throw new Error('Elements missing') }
            )
        })
    
    return library
})()