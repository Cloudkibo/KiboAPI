const utility = require('../../utility')

exports.index = function (req, res) {
  utility.callApi(`post`, 'get', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.viewPost = function (req, res) {
  utility.callApi(`post/${req.params.id}`, 'get', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.create = function (req, res) {
  utility.callApi(`post/create`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      console.log('Response', response)
      return res.status(201).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.edit = function (req, res) {
  utility.callApi(`post/edit`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(201).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.delete = function (req, res) {
  utility.callApi(`post/delete/${req.params.id}`, 'delete', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
