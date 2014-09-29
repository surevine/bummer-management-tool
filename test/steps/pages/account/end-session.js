var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .define('[Given|And|When] I visit the end session page of (.*)', function(user) {
            var url = 'http://localhost:' +
                helper.application.helper.port +
                '/user/end-session/' + user
            this.driver.get(url)
        })
        .given('I click to end a session', function() {
            this.driver.element('table.user-table i.end-user-session').click()
        })
        .when('I see the end session modal', function() {
            var driver = this.driver
            driver.wait(function() {
                return driver.element('#end-session').isDisplayed(function(visible) {
                    return visible === true
                })
            }, 5000, 'Waiting for end session modal')
        })
        .then('the end session modal is closed', function() {
            var driver = this.driver
            driver.wait(function() {
                return driver.element('#end-session').isDisplayed(function(visible) {
                    return visible === false
                })
            }, 5000, 'Waiting for end session modal to close')
        })
    
    return library
})()