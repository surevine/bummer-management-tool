var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .then('I see the user information page', function() {
            var jid = this.params.jid
            this.driver.element('h1.page-header').text(function(text) {
                text.should.equal('User information page for ' + jid)  
            })
            this.driver.elements('table.user-table head tr th').get(0, function(element) {
                element.text(function(text) {
                    text.should.containEql('Resource') 
                })
            })
            this.driver.elements('table.user-table head tr th').get(1, function(element) {
                element.text(function(text) {
                    text.should.containEql('IP Address') 
                })
            })
            this.driver.elements('table.user-table head tr th').get(2, function(element) {
                element.text(function(text) {
                    text.should.containEql('Actions') 
                })
            })
            this.driver.element('table.user-table')
            this.driver.button('Close all sessions').then(
                function() {},
                function() { throw new Error('Expected close all sessions button') }
            )
        })
    
    return library
})()