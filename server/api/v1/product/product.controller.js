const dataLayer = require('../consumers/consumers.datalayer')
const crypto = require('crypto')

exports.index = function (req, res) {
  dataLayer.findOne({'consumerId.companyId': req.user.companyId, 'consumerId.userId': req.user._id})
    .then(consumer => {
      if (!consumer) {
        var apiKey = crypto.randomBytes(10).toString('hex')
        var apiSecret = crypto.randomBytes(10).toString('hex')
        var consumerPayload = {
          consumerId: { userId: req.user._id, companyId: req.user.companyId },
          credentials: {api_key: apiKey, api_secret: apiSecret},
          scope: { kiboPush: false, kiboEngage: false, kiboCommerce: false }
        }
        console.log('consumerPayload', consumerPayload)
        dataLayer.createObject(consumerPayload)
          .then(newConsumer => {
            res.render('pages/productAccess', {consumer: newConsumer, user: req.user})
          })
          .catch(error => {
            return res.status(500).json({
              status: 'failed',
              payload: `Failed to create consumer ${JSON.stringify(error)}`
            })
          })
      } else {
        res.render('pages/productAccess', {consumer: consumer, user: req.user})
      }
    })
    .catch(error => {
      return res.status(500).json({
        status: 'failed',
        payload: `Failed to find consumer ${JSON.stringify(error)}`
      })
    })
}
