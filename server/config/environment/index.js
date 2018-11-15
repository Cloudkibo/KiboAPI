/**
 * Created by sojharo on 20/07/2017.
 */

const path = require('path')
const _ = require('lodash')

const all = {

  env: process.env.NODE_ENV,

  // Project root path
  root: path.normalize(`${__dirname}/../../..`),

  // Server port
  port: process.env.PORT || 3000,

  // Secure Server port
  secure_port: process.env.SECURE_PORT || 8443,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.SESSION_SECRET || 'f83b0cd6ccb20142185616dsf54dsf4'
  },

  ip: process.env.OPENSHIFT_NODEJS_IP ||
  process.env.IP ||
  undefined,

  domain: `${process.env.DOMAIN || 'https://staging.kibopush.com'}`,

  webhook_ip: process.env.WEBHOOK_IP_ADDRESS || 'localhost',

  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  API_URL_ACCOUNTS: process.env.NODE_ENV === 'production' ? 'https://accounts.cloudkibo.com/api/v1/' : process.env.NODE_ENV === 'staging' ? 'https://saccounts.cloudkibo.com/api/v1/' : 'http://localhost:3000/api/v1/',
  API_URL_WEBHOOK: process.env.NODE_ENV === 'production' ? 'https://webhook.cloudkibo.com/api' : process.env.NODE_ENV === 'staging' ? 'https://swebhook.cloudkibo.com/api' : 'http://localhost:3000/api'
}

module.exports = _.merge(
  all,
  require(`./${process.env.NODE_ENV}.js`) || {})
