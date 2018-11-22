const utility = require('../../utility')

exports.allLists = function (req, res) {
  utility.callApi(`lists`, 'get', {}, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.getAll = function (req, res) {
  utility.callApi(`lists/getAll`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.createList = function (req, res) {
  utility.callApi(`lists/createList`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.editList = function (req, res) {
  utility.callApi(`lists/editList`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.viewList = function (req, res) {
  utility.callApi(`lists/viewList/${req.params.id}`, 'get', {}, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.deleteList = function (req, res) {
  utility.callApi(`lists/deleteList/${req.params.id}`, 'delete', {}, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.repliedPollSubscribers = function (req, res) {
  utility.callApi(`lists/repliedPollSubscribers`, 'get', {}, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.repliedSurveySubscribers = function (req, res) {
  utility.callApi(`lists/repliedSurveySubscribers`, 'get', {}, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
