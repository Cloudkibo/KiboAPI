const utility = require('../../utility')

exports.upload = function (req, res) {
  utility.callApi(`growthtools/upload`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.sendNumbers = function (req, res) {
  utility.callApi(`growthtools/sendNumbers`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.pendingSubscription = function (req, res) {
  utility.callApi(`growthtools/pendingSubscription/${req.params.name}`, 'get', {}, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
