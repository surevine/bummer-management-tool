var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .given('I am logged in', function(value, field) {
            this.driver.get('http://localhost:' + helper.application.helper.port + '/login')
            this.driver.input('div.container input[name="jid"]').enter('marty@localhost')
            this.driver.input('div.container input[name="password"]').enter('secret')
            this.driver.button('Sign in').click()
        })
        .given('a fresh session', function() {
            this.driver.get('http://localhost:' + helper.application.helper.port + '/logout')
        })
        .when('I click the \'(.*)\' button', function(label) {
            this.driver.button(label).click()
        })
    
    return library
})()