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
    
    return library
})()