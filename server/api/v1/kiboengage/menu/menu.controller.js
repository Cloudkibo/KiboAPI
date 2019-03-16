const callApi = require('../../utility')

// Get list of menu items
exports.index = function (req, res) {
  callApi.callApi(`menu`, 'get', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.indexByPage = function (req, res) {
  callApi.callApi(`menu/indexByPage`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.create = function (req, res) {
  callApi.callApi(`menu/create`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(201).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
