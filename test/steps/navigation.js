var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .given('I visit the (.*) page', function(page) {
            var url = 'http://localhost:' + helper.application.helper.port + '/'
            switch (page) {
                case 'login':
                    url += 'login'
                    break
                default:
                    throw new Error('Unknown page')
            }
            this.driver.get(url)
        })
        .then('I am redirected to the (.*) page', function(page) {
            var path = null
            switch (page) {
                case 'account':
                    path = '/account'
                    break
                default:
                    throw new Error('Unknown page')
            }
            this.driver.currentUrl(function(url, currentUrl) {
                currentUrl.path.should.equal(path)
            })
        })
    
    return library
})()