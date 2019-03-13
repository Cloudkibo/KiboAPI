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
    webhook: 'http://localhost:3020/api',
    kibopush: 'http://localhost:3000/api',
    accounts: 'http://localhost:3024/api/v1',
    chat: 'http://localhost:3022/api',
    kibochat: `http://localhost:3022/api`,
    kiboengage: `http://localhost:3021/api`,
    kibodash: `http://localhost:5050/api/v1`
  }
}
