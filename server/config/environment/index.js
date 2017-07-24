/**
 * Created by sojharo on 20/07/2017.
 */

const path = require('path');
const _ = require('lodash');

var all = {

  env: process.env.NODE_ENV,

  // Project root path
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 3000,

  // Secure Server port
  secure_port: process.env.SECURE_PORT || 8443,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.SESSION_SECRET || 'f83b0cd6ccb20142185616dsf54dsf4'
  },

  // MySQL Connection Options
  db: {
    mysql: {
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }
  },

  facebook: {
    clientID:     process.env.FACEBOOK_ID || '456637644436523',
    clientSecret: process.env.FACEBOOK_SECRET || 'f46495b908b408bc8e4f5b259b18e952',
    callbackURL:  (process.env.DOMAIN || 'https://api.cloudkibo.com') + '/auth/facebook/callback'
  }
};

module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});