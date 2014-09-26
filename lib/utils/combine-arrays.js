var debug = require('debug')('utils/combine-arrays')

module.exports = function(fieldVars, data) {
    var response = []
    for (var i = 0; i < data[fieldVars[0]].length; i++) {
        var r = {}
        fieldVars.forEach(function(fieldVar) {
            r[fieldVar] = data[fieldVar][i]  
        })
        response.push(r)
    }
    debug('Returning', response)
    return response
}