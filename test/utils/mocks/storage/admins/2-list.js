var admins = [
    { jid: 'docbrown@localhost', domain: 'localhost' },
    { jid: 'marty@localhost', domain: 'localhost' }
]

module.exports = function() {
    return [
        { error: null, data: admins }   
    ]
}