const utility = require('../../utility')

exports.index = function (req, res) {
  utility.callApi(`automationQueue`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.create = function (req, res) {
  utility.callApi(`automationQueue/create`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
