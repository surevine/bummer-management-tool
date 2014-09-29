var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .define('[Given|When|And] I enter \'(.*)\' in the \'(.*)\' field', function(value, field) {
            this.driver.input('input[name="' + field + '"]').enter(value)
        })
        .define('[Given|When|And] I click the \'(.*)\' button(?: in the \'(.*)\' modal)?', function(label, modal) {
            if (modal) {
                this.driver.content(label, 'div[@id="' + modal + '"]//button').click()
            } else {
                this.driver.button(label).click()
            }
        })
    
    return library
})()