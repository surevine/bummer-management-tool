var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .then('the user table has warning row \'(.*)\'', function(message) {
            this.driver.input('table.user-table tbody tr.warning td').text(function(text) {
                text.should.containEql(message)
            })
        })
        .then('the user table has ([0-9]*) users', function(expected) {
            this.driver.elements('table.user-table tbody tr td').count(function(count) {
                count.should.equal.expected
            })
        })
        .then('none of the users is \'(.*)\'', function(user) {
            this.driver.element('table.user-table tbody').text(function(text) {
                text.should.not.containEql(user)
            })
        })
    
    return library
})()