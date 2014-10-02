var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .define('[Given|And|When] I visit the reset password page of (.*)', function(user) {
            var url = 'http://localhost:' +
                helper.application.helper.port +
                '/user/password-reset/' + user
            this.driver.get(url)
        })
        .when('I see the password reset modal', function() {
            var driver = this.driver
            driver.wait(function() {
                return driver.element('#reset-user-password').isDisplayed(function(visible) {
                    return visible === true
                })
            }, 5000, 'Waiting for reset password modal')
        })
        .when('I click to reset a user password', function() {
            this.driver.element('i.reset-user-password').click()
        })
        .then('the password reset modal is closed', function() {
            var driver = this.driver
            driver.wait(function() {
                return driver.element('#reset-user-password').isDisplayed(function(visible) {
                    return visible === false
                })
            }, 5000, 'Waiting for password reset modal to close')
        })
        .then('I see the password reset (.*) modal', function(type) {
            var driver = this.driver
            driver.wait(function() {
                return driver.element('#reset-user-password-' + type).isDisplayed(function(visible) {
                    return visible === true
                })
            }, 5000, 'Waiting for reset password ' + type + ' modal')
        })
        .then('the JSON response has property \'(.*)\' with value \'(.*)\'', function(property, value) {
            this.driver.element('*').text(function(text) {
                JSON.parse(text)[property].should.equal(value)
            })
        })
        .then('the JSON response has property \'(.*)\' which matches \'(.*)\'', function(property, regex) {
            this.driver.element('*').text(function(text) {
                JSON.parse(text)[property].should.match(new RegExp(regex))
            })
        })
        .then('I see element \'(.*)\' with value (.*)\'(.*)\'', function(element, matching, value) {
              this.driver.element(element).text(function(text) {
                  if (matching) {
                      text.should.match(new RegExp(value))
                  } else {
                      text.should.equal(value)
                  }
              })
        })
    return library
})()