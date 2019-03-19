const utility = require('../../utility')

exports.index = function (req, res) {
  utility.callApi(`polls/all/${req.params.days}`, 'get', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.allPolls = function (req, res) {
  utility.callApi(`polls/allPolls`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.create = function (req, res) {
  utility.callApi(`polls/create`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(201).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.send = function (req, res) {
  utility.callApi(`polls/send`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.sendPoll = function (req, res) {
  utility.callApi(`polls/sendPollDirectly`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.deletePoll = function (req, res) {
  utility.callApi(`polls/deletePoll/${req.params.id}`, 'delete', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.getAllResponses = function (req, res) {
  utility.callApi(`polls/allResponses`, 'get', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.getresponses = function (req, res) {
  utility.callApi(`polls/responses/${req.params.id}`, 'get', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
