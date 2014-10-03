var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .define('[Given|And|When] I visit the remove admin page of (.*)', function(user) {
            var url = 'http://localhost:' +
                helper.application.helper.port +
                '/admin/remove/' + user
            this.driver.get(url)
        })
        .define('[Given|And|When] I click to remove an admin', function() {
            this.driver.element('i.remove-admin').click()
        })
        .when('I see the remove admin modal', function() {
            var driver = this.driver
            driver.wait(function() {
                return driver.element('#remove-admin').isDisplayed(function(visible) {
                    return visible === true
                })
            }, 5000, 'Waiting for remove admin modal')
        })
        .then('the remove admin modal is closed', function() {
            var driver = this.driver
            driver.wait(function() {
                return driver.element('#remove-admin').isDisplayed(function(visible) {
                    return visible === false
                })
            }, 5000, 'Waiting for remove admin modal to close')
        })
    return library
})()