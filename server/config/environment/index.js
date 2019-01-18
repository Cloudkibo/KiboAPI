const path = require('path')
const _ = require('lodash')

const all = {
  env: process.env.NODE_ENV,

  // Project root path
  root: path.normalize(`${__dirname}/../../..`),

  ip: process.env.IP || undefined,

  // Mongo Options
  mongo: {
    options: {
      db: {
        safe: true
      },
      useNewUrlParser: true
    }
  }
}

module.exports = _.merge(
  all,
  require(`./${process.env.NODE_ENV}.js`) || {})
