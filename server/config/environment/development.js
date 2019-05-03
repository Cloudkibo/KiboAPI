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

  api_urls: {
    webhook: 'http://localhost:3020/api',
    kibopush: 'http://localhost:3000/api',
    accounts: 'http://localhost:3024/api/v1',
    chat: 'http://localhost:3022/api',
    kibochat: `http://localhost:3022/api`,
    kiboengage: `http://localhost:3021/api`,
    kibodash: `http://localhost:5050/api/v1`,
    kiboEngageDBLayer: `http://localhost:3031/api/v1`,
    kiboChatDBLayer: `http://localhost:3030/api/v1`
  }
}
