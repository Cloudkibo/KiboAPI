// This middleware allows either an API access is enabled from the develoepr dashboard
// Use this middleware in the index file of each API Node as the second parameter of router methdos.
// i.e. router.post(/endpoint, appMiddleware(kiboChat), {...})

let ConsumerInfo = require('./../api/v1/consumers/consumers.datalayer')
let logger = require('./../components/logger')
let TAG = '/server/config/app.middleware.js'
let util = require('util')

module.exports = function (apiScope) {
  return function (req, res, next) {
    let failedMessage = 'API is not enabled from developer dashboard'
    let userId = req.body.userId
    let companyId = req.body.companyId

    ConsumerInfo.findOne({userId, companyId})
      .then(info => {
        if (apiScope === 'kiboChat') {
          if (info.scope.kiboChat) {
            next()
          } else {
            res.status(401).json({status: 'failed', description: `${apiScope} ${failedMessage}`})
          }
        } else if (apiScope === 'kiboEngage') {
          if (info.scope.kiboEngage) {
            next()
          } else {
            res.status(401).json({status: 'failed', description: `${apiScope} ${failedMessage}`})
          }
        } else if (apiScope === 'kiboCommerce') {
          if (info.scope.kiboCommerce) {
            next()
          } else {
            res.status(401).json({status: 'failed', description: `${apiScope} ${failedMessage}`})
          }
        }
      })
      .catch(err => {
        logger.serverLog(TAG, `Internal Server Error at Catch ${util.inspect(err)}`)
        res.status(500).json({status: 'failed', description: `Internal Server Error`})
      })
  }
}
