const utility = require('../../utility')

exports.index = function (req, res) {
  utility.callApi(`webhooks`, 'get', {}, req.headers.consumer_id, 'accounts')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.create = function (req, res) {
  utility.callApi(`webhooks/create`, 'post', req.body, req.headers.consumer_id, 'accounts')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.edit = function (req, res) {
  utility.callApi(`webhooks/edit`, 'post', req.body, req.headers.consumer_id, 'accounts')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.isEnabled = function (req, res) {
  utility.callApi(`webhooks/enabled`, 'post', req.body, req.headers.consumer_id, 'accounts')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
