var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .then('I see (.*) message \'(.*)\'', function(type, message) {
            this.driver.element('div.alert-' + type).html(function(html) {
                html.should.containEql(message)
            })
        })
    
    return library
})()