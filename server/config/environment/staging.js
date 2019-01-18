'use strict'

// Development specific configuration
// ==================================
module.exports = {

  // Server port
  port: process.env.PORT || 8000,

  // Secure Server port
  secure_port: process.env.SECURE_PORT || 8443,

  domain: `${process.env.DOMAIN || 'https://skiboapi.cloudkibo.com'}`,

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/KiboAPII-dev'
  },
  seedDB: false,

  ACCOUNTS_URL: 'https://saccounts.cloudkibo.com/api/v1/',
  KIBOENGAGE_URL: 'https://skiboengage.cloudkibo.com/api/v1/',
  KIBOCHAT_URL: 'https://skibochat.cloudkibo.com/api/v1/'
}
