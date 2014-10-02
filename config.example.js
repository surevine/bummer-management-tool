module.exports = {
    storage: {
        type: 'postgresql',
        postgresql: {
            username: 'managementconsole',
            password: 'tellnoone',
            database: 'managementconsole'
        }
    },
    cookie: {
        secret: 'a-cookie-secret'
    }
}
