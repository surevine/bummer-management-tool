var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .when('I search users for \'(.*)\'', function(user) {
            var driver = this.driver
            driver.input('input[type="search"]').enter(user)
            driver.wait(function() {
                return driver.element('div.dataTables_info').text(function(text) {
                    return -1 !== text.indexOf('filtered')
                }, 2000, 'Waiting for filtering to take place')
            })
        })
        .then('the user table has warning row \'(.*)\'', function(message) {
            this.driver.input('table.user-table tbody tr.warning td').text(function(text) {
                text.should.containEql(message)
            })
        })
        .then('the user table has ([0-9]*) users', function(expected) {
            var expected = parseInt(expected)
            this.driver.elements('table.user-table tbody tr').count(function(count) {
                count.should.equal(expected)
            })
        })
        .then('none of the users is \'(.*)\'', function(user) {
            this.driver.element('table.user-table tbody').text(function(text) {
                text.should.not.containEql(user)
            })
        })
    
    return library
})()