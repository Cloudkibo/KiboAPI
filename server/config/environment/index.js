const path = require('path')
const _ = require('lodash')

const all = {
  env: process.env.NODE_ENV,

  // Project root path
  root: path.normalize(`${__dirname}/../../..`),

  // Server port
  port: process.env.PORT || 8000,

  // Secure Server port
  secure_port: process.env.SECURE_PORT || 8443,

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
  API_URL_ACCOUNTS: process.env.NODE_ENV === 'production' ? 'https://accounts.cloudkibo.com/api/v1' : process.env.NODE_ENV === 'staging' ? 'https://saccounts.cloudkibo.com/api/v1' : 'http://localhost:3001/api/v1'
}

module.exports = _.merge(
  all,
  require(`./${process.env.NODE_ENV}.js`) || {})
