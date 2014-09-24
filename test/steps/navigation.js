var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .define('[Given|And|When] I visit the (.*) page', function(page) {
            var url = 'http://localhost:' + helper.application.helper.port + '/'
            switch (page) {
                case 'login':
                    url += 'login'
                    break
                case 'account':
                    url += 'account'
                    break
                case 'home':
                    break
                default:
                    throw new Error('Unknown page')
            }
            this.driver.get(url)
        })
        .when('I refresh the page', function() {
            var driver = this.driver
            driver.currentUrl(function(url) {
                driver.get(url)
            })
        })
        .when('I click the \'(.*)\' link', function(linkText) {
            this.driver.content(linkText, 'a').click()
        })
        .then('I am redirected to the (.*) page', function(page) {
            var path = null
            switch (page) {
                case 'account':
                    path = '/account'
                    break
                case 'home':
                    path = '/'
                    break
                case 'login':
                    path = '/login'
                    break
                default:
                    throw new Error('Unknown page')
            }
            var driver = this.driver
            driver.wait(function() {
                return driver.currentUrl(function(url, currentUrl) {
                    return currentUrl.path === path
                })
            }, 2000, 'Waiting to be redirected to the ' + page + ' page')
        })
    
    return library
})()