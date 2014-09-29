var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .then('I see the added user details', function() {
            this.driver.content('Added user details', 'h3').then(
                function() {},
                function() { throw new Error('New user details should be displayed') }
            )
            this.driver.element('form.new-user div.jid p').text(function(jid) {
                jid.should.equal('mrstrickland@localhost')
            })
            this.driver.element('form.new-user div.password p.hide-password').text(function(password) {
                password.should.match(/[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}/i)
            })
        })
        .then('I see the add user page', function() {
            this.driver.element('h1.page-header').text(function(header) {
                header.should.equal('Add User')
            })
            this.driver.element('h3').text(function(header) {
                header.should.equal('Instructions')
            })
            this.driver.element('strong.post-label').text(function(domain) {
                domain.should.equal('@ localhost')
            })
            this.driver.element('input[name="local"]')
            this.driver.element('button.create-user').then(
                function() {},
                function() { throw new Error('Elements missing') }
            )
        })
        .then('the new password (has|does not have) class \'(.*)\'', function(has, cssClass) {
            var has = ('has' === has) ? true : false
            this.driver.element('form.new-user div.password p.hide-password').attr('class', function(cssClasses) {
                if (has) {
                    cssClasses.should.containEql(cssClass)
                } else {
                    cssClasses.should.not.containEql(cssClass)
                }
            })
        })
        .then('I click the new password', function() {
            this.driver.element('form.new-user div.password p.hide-password').click()
        })
    
    return library
})()