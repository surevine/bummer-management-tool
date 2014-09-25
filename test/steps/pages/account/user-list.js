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
        .when('I select to view ([0-9]*) users', function(userCount) {
            this.driver.dropdownlist('select[name="DataTables_Table_0_length"]').option(userCount)
        })
        .when('I click the \'(.*)\' header', function(header) {
            this.driver.content(header, 'th', true).click()  
        })
        .then('the user table has warning row \'(.*)\'', function(message) {
            this.driver.input('table.user-table tbody tr.warning td').text(function(text) {
                text.should.containEql(message)
            })
        })
        .then('the user table has ([0-9]*) users', function(expected) {
            var expected = parseInt(expected)
            var driver = this.driver
            var actual = null
            driver.wait(function() {
                return driver.elements('table.user-table tbody tr').count(function(count) {
                    if (count) actual = count
                    return count === expected
                })
            }, 2000, 'Waiting for correct number of table rows ' + expected + ':' + actual)
        })
        .then('none of the users is \'(.*)\'', function(user) {
            this.driver.element('table.user-table tbody').text(function(text) {
                text.should.not.containEql(user)
            })
        })
        .then('I do not see the user search box', function() {
            this.driver.element('select[name="DataTables_Table_0_length"]').then(
                function() { throw new Error('Should not exist') },
                function() {}
            )
            this.driver.element('div.dataTables_info').then(
                function() { throw new Error('Should not exist') },
                function() {}
            )
        })
        .then('(.*) row ([0-9]*) contains \'(.*)\'', function(tableClass, row, content) {
            this.driver.elements('table.' + tableClass + ' tbody tr').get(row - 1, function(element) {
                element.text(function(text) {
                    text.should.containEql(content) 
                })
            })
        })
    
    return library
})()