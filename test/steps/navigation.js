var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .define('[Given|And|When] I visit (?:the )?(.*) page$', function(page) {
            var url = 'http://localhost:' + helper.application.helper.port + '/'
            switch (page) {
                case 'add user':
                    url += 'user/add'
                    break
                case 'login':
                    url += 'login'
                    break
                case 'account':
                    url += 'account'
                    break
                case 'user list':
                    url += 'account/users'
                    break
                case 'user':
                    url += 'user'
                    break
                case 'end session':
                    url += 'user/end-session'
                    break
                case 'delete user':
                    url += 'user/delete'
                    break
                case 'home':
                    break
                case 'a random':
                    url += 'a/random/page'
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
        .then('I am redirected to the (.*) page(?: for (.*))?', function(page, jid) {
            var path = null
            switch (page) {
                case 'account':
                    path = '/account'
                    break
                case 'home':
                    path = '/'
                    break
                case 'user list':
                    path = '/account/users'
                    break
                case 'login':
                    path = '/login'
                    break
                case 'user':
                    path = '/user/' + jid
                    break
                default:
                    throw new Error('Unknown page')
            }
            var driver = this.driver
            driver.wait(function() {
                return driver.currentUrl(function(url, currentUrl) {
                    return 0 === currentUrl.path.indexOf(path)
                })
            }, 2000, 'Waiting to be redirected to the ' + page + ' page')
        })
        .then('the browser returns 404 page', function() {
            this.driver.getTitle(function(title) {
                title.should.containEql('Page not found')
            })
        })
    
    return library
})()