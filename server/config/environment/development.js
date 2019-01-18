'use strict'

// Development specific configuration
// ==================================
module.exports = {

  // Server port
  port: 3023,

  // Secure Server port
  secure_port: 8443,

  domain: `${process.env.DOMAIN || 'http://localhost:3023'}`,

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/KiboAPII-dev'
  },
  seedDB: false,

  ACCOUNTS_URL: 'http://localhost:3024',
  KIBOENGAGE_URL: 'http://localhost:3021',
  KIBOCHAT_URL: 'http://localhost:3022'
}
