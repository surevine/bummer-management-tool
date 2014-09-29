module.exports = function() {
    var parts = []
    for (var i = 0; i < 4; i++) {
        parts.push(Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4))
    }
    return parts.join('-')
}