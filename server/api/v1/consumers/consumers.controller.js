const dataLayer = require('./consumers.datalayer')
const crypto = require('crypto')

exports.updateProductStatus = function (req, res) {
  console.log('req.body', req.body)
  dataLayer.findOne({_id: req.body._id})
    .then(consumer => {
      console.log('consumer', (req.body.scope.value === 'true'))
      consumer.scope[req.body.scope.key] = (req.body.scope.value === 'true')
      console.log('consumer updated', consumer.scope)
      dataLayer.updateObject({_id: req.body._id}, {scope: consumer.scope}, {new: true})
        .then(updated => {
          console.log('updated', updated)
          return res.status(200).json({
            status: 'success',
            payload: updated
          })
        })
        .catch(error => {
          return res.status(500).json({
            status: 'failed',
            payload: `Failed to update status ${JSON.stringify(error)}`
          })
        })
    })
    .catch(error => {
      return res.status(500).json({
        status: 'failed',
        payload: `Failed to find consumer ${JSON.stringify(error)}`
      })
    })
}

exports.enable = function (req, res) {
  let apiKey = crypto.randomBytes(10).toString('hex')
  let apiSecret = crypto.randomBytes(18).toString('hex')
  dataLayer.createObject({
    consumerId: {
      userId: req.user._id,
      companyId: req.user.companyId
    },
    credentials: {
      api_key: apiKey,
      api_secret: apiSecret
    }
  })
    .then(success => {
      return res.status(200).json({
        status: 'success',
        payload: success
      })
    })
    .catch(error => {
      return res.status(500).json({
        status: 'failed',
        payload: `Failed to enable api ${JSON.stringify(error)}`
      })
    })
}

exports.reset = function (req, res) {
  dataLayer.findOne({'consumerId.userId': req.user._id})
    .then(consumer => {
      let apiKey = crypto.randomBytes(10).toString('hex')
      let apiSecret = crypto.randomBytes(18).toString('hex')
      consumer.credentials = {
        api_key: apiKey,
        api_secret: apiSecret
      }
      dataLayer.updateObject({'consumerId.userId': req.user._id}, consumer)
        .then(updated => {
          return res.status(200).json({
            status: 'success',
            payload: updated
          })
        })
        .catch(error => {
          return res.status(500).json({
            status: 'failed',
            payload: `Failed to update status ${JSON.stringify(error)}`
          })
        })
    })
    .catch(error => {
      return res.status(500).json({
        status: 'failed',
        payload: `Failed to update status ${JSON.stringify(error)}`
      })
    })
}
