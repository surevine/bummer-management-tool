var helper = require('massah/helper')
  , should = require('should')

module.exports = (function() {
    var library = helper.getLibrary()
        .define('[Given|And|When] I visit the user page of (.*)', function(user) {
            var url = 'http://localhost:' +
                helper.application.helper.port +
                '/user/' + user
            this.driver.get(url)
        })
        .then('none of the users is \'(.*)\'', function(user) {
            this.driver.element('table.user-table tbody').text(function(text) {
                text.should.not.containEql(user)
            })
        })
        .when('I click to view information for user (.*)', function(jid) {
            this.driver.element('table.user-table a[href="/user/' + jid + '"]').click()
            this.params.jid = jid
        })
    
    return library
})()