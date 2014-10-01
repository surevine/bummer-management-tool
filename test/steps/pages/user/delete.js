var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .define('[Given|And|When] I visit the delete user page of (.*)', function(user) {
            var url = 'http://localhost:' +
                helper.application.helper.port +
                '/user/delete/' + user
            this.driver.get(url)
        })
        .when('I see the delete user modal', function() {
            var driver = this.driver
            driver.wait(function() {
                return driver.element('#delete-user').isDisplayed(function(visible) {
                    return visible === true
                })
            }, 5000, 'Waiting for delete user modal')
        })
        .then('the delete user modal is closed', function() {
            var driver = this.driver
            driver.wait(function() {
                return driver.element('#delete-user').isDisplayed(function(visible) {
                    return visible === false
                })
            }, 5000, 'Waiting for delete user modal to close')
        })
    return library
})()