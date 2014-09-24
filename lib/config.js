var environment = process.env.NODE_ENV || 'production'

require('colors')

var config = null
try {
  config = require('../config.' + environment)
} catch (e) {
  console.log('No configuration file found!'.red)
}
if (!config) config = {}

if (!config.cookie) {
    config.cookie = {}
}
if (!config.cookie.secret) {
    console.log('No cookie secret set.\nYou\'re a naughty, naughty person!'.red)
    config.cookie.secret = 'application-secret'
}

module.exports = config