const utility = require('../../utility')

exports.index = function (req, res) {
  utility.callApi(`sessions`, 'get', {}, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.getNewSessions = function (req, res) {
  utility.callApi(`sessions/getOpenSessions`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.getResolvedSessions = function (req, res) {
  utility.callApi(`sessions/getClosedSessions`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.markread = function (req, res) {
  utility.callApi(`sessions/markread/${req.params.id}`, 'get', {}, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.show = function (req, res) {
  utility.callApi(`sessions/${req.params.id}`, 'get', {}, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.changeStatus = function (req, res) {
  utility.callApi(`sessions/changeStatus`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.assignAgent = function (req, res) {
  utility.callApi(`sessions/assignAgent`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.assignTeam = function (req, res) {
  utility.callApi(`sessions/assignTeam`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.unSubscribe = function (req, res) {
  utility.callApi(`sessions/unSubscribe`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.genericFind = function (req, res) {
  utility.callApi(`sessions/query`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
