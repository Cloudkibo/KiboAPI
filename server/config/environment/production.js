// Production specific configuration
// ==================================
module.exports = {
  // Server port
  port: process.env.PORT || 3023,

  // Secure Server port
  secure_port: process.env.SECURE_PORT || 8443,

  domain: `${process.env.DOMAIN || 'https://kiboapi.cloudkibo.com'}`,

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost/KiboAPI-prod'
  },
  seedDB: false,

  api_urls: {
    webhook: 'https://webhook.cloudkibo.com/api',
    kibopush: 'https://app.kibopush.com/api',
    accounts: 'https://accounts.cloudkibo.com/api/v1',
    kiboengage: 'https://kiboengage.cloudkibo.com/api',
    kibochat: 'https://kibochat.cloudkibo.com/api',
    // kibochat: `${process.env.DB_LAYER_IP_KIBOCHAT}/api/v1`,
    // kiboengage: `${process.env.DB_LAYER_IP_KIBOENGAGE}/api/v1`,
    kibodash: `${process.env.KIBODASH}/api/v1`,
    kiboEngageDBLayer: `${process.env.DB_LAYER_IP_KIBOENGAGE}/api/v1`,
    kiboChatDBLayer: `${process.env.DB_LAYER_IP_KIBOCHAT}/api/v1`
  }
}
