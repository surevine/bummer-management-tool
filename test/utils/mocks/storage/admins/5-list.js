var admins = [
    { jid: 'docbrown@localhost', domain: 'localhost' },
    { jid: 'marty@localhost', domain: 'localhost' },
    { jid: 'einstein@localhost', domain: 'localhost' },
    { jid: 'biff@localhost', domain: 'localhost' },
    { jid: 'george@localhost', domain: 'localhost' }
]

module.exports = function() {
    return [
        { error: null, data: admins }   
    ]
}