const utility = require('../../utility')

exports.index = function (req, res) {
  utility.callApi(`broadcasts/allBroadcasts`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.delete = function (req, res) {
  utility.callApi(`broadcasts/delete/${req.params.id}`, 'get', {}, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.addButton = function (req, res) {
  utility.callApi(`broadcasts/addButton`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.editButton = function (req, res) {
  utility.callApi(`broadcasts/editButton`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.deleteButton = function (req, res) {
  utility.callApi(`broadcasts/deleteButton/${req.params.id}`, 'delete', {}, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.upload = function (req, res) {
  utility.callApi(`broadcasts/upload`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.sendConversation = function (req, res) {
  utility.callApi(`broadcasts/sendConversation`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
