var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .then('I see (.*) message \'(.*)\'', function(type, message) {
            if ('error' === type) type = 'danger'
            this.driver.element('div.alert-' + type).text(function(text) {
                text.should.containEql(message)
            })
        })
    
    return library
})()