var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .when('I enter \'(.*)\' in the \'(.*)\' field', function(value, field) {
            this.driver.input('div.container input[name="' + field + '"]').enter(value)
        })
        .define('[Given|When|And] I click the \'(.*)\' button', function(label) {
            this.driver.button(label).click()
        })
    
    return library
})()