// Production specific configuration
// ==================================
module.exports = {
  // Server port
  port: process.env.PORT || 8000,

  // Secure Server port
  secure_port: process.env.SECURE_PORT || 8443,

  domain: `${process.env.DOMAIN || 'https://kiboapi.cloudkibo.com'}`,

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost/KiboAPI-prod'
  },
  seedDB: false,

  ACCOUNTS_URL: 'https://accounts.cloudkibo.com/api/v1/',
  KIBOENGAGE_URL: 'https://kiboengage.cloudkibo.com/api/v1/',
  KIBOCHAT_URL: 'https://kibochat.cloudkibo.com/api/v1/'
}
