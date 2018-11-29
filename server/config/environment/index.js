const path = require('path')
const _ = require('lodash')

const all = {
  env: process.env.NODE_ENV,

  // Project root path
  root: path.normalize(`${__dirname}/../../..`),

  // Server port
  port: process.env.PORT || 8000,

  // Secure Server port
  secure_port: process.env.SECURE_PORT || 8444,

  ip: process.env.IP || undefined,

  domain: `${process.env.DOMAIN || 'https://kiboapi.cloudkibo.com'}`,

  // Mongo Options
  mongo: {
    options: {
      db: {
        safe: true
      },
      useNewUrlParser: true
    }
  },
  ACCOUNTS_URL: process.env.NODE_ENV === 'production' ? 'https://accounts.cloudkibo.com/api/v1/' : process.env.NODE_ENV === 'staging' ? 'https://saccounts.cloudkibo.com/api/v1/' : 'http://localhost:3001/api/v1/',
  KIBOENGAGE_URL: process.env.NODE_ENV === 'production' ? 'https://kiboengage.cloudkibo.com/api/v1/' : process.env.NODE_ENV === 'staging' ? 'https://skiboengage.cloudkibo.com/api/' : 'http://localhost:3000/api/',
  KIBOCHAT_URL: process.env.NODE_ENV === 'production' ? 'https://kibochat.cloudkibo.com/api/v1/' : process.env.NODE_ENV === 'staging' ? 'https://skibochat.cloudkibo.com/api/' : 'http://localhost:3000/api/'
}

module.exports = _.merge(
  all,
  require(`./${process.env.NODE_ENV}.js`) || {})
