var admins = [
    { jid: 'docbrown@localhost', domain: 'localhost' },
    { jid: 'marty@localhost', domain: 'localhost' },
    { jid: 'einstein@localhost', domain: 'localhost' },
    { jid: 'biff@localhost', domain: 'localhost' },
    { jid: 'george@localhost', domain: 'localhost' },
    { jid: 'marvin@localhost', domain: 'localhost' },
    { jid: 'strickland@localhost', domain: 'localhost' },
    { jid: 'goldie@localhost', domain: 'localhost' },
    { jid: 'sherman@localhost', domain: 'localhost' },
    { jid: 'linda@localhost', domain: 'localhost' },
    { jid: 'jennifer@localhost', domain: 'localhost' }
]

module.exports = function() {
    return [
        { error: null, data: admins }   
    ]
}