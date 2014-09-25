var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .then('the user table has warning row \'(.*)\'', function(message) {
            this.driver.input('table.user-table tbody tr.warning td').text(function(text) {
                text.should.containEql(message)
            })
        })
    
    return library
})()