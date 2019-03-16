const utility = require('../../utility')

exports.index = function (req, res) {
  utility.callApi(`bots`, 'get', {}, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.waitingReply = function (req, res) {
  utility.callApi(`bots/waitingReply`, 'get', {}, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.create = function (req, res) {
  utility.callApi(`bots/create`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.edit = function (req, res) {
  utility.callApi(`bots/edit`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.status = function (req, res) {
  utility.callApi(`bots/updateStatus`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.details = function (req, res) {
  utility.callApi(`bots/botDetails`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.unAnsweredQueries = function (req, res) {
  utility.callApi(`bots/fetchUnansweredQueries`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.waitSubscribers = function (req, res) {
  utility.callApi(`bots/fetchWaitingSubscribers`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.removeWaitSubscribers = function (req, res) {
  utility.callApi(`bots/removeWaitingSubscribers`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.delete = function (req, res) {
  utility.callApi(`bots/delete`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
