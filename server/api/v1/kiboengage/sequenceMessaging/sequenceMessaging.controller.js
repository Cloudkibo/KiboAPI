const utility = require('../../utility')

exports.allMessages = function (req, res) {
  utility.callApi(`sequenceMessaging/allMessages/${req.params.id}`, 'get', {}, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.allSequences = function (req, res) {
  utility.callApi(`sequenceMessaging/allSequences`, 'get', {}, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.subscriberSequences = function (req, res) {
  utility.callApi(`sequenceMessaging/subscriberSequences/${req.params.id}`, 'get', {}, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.deleteMessage = function (req, res) {
  utility.callApi(`sequenceMessaging/deleteMessage/${req.params.id}`, 'delete', {}, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.deleteSequence = function (req, res) {
  utility.callApi(`sequenceMessaging/deleteSequence/${req.params.id}`, 'delete', {}, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.createSequence = function (req, res) {
  utility.callApi(`sequenceMessaging/createSequence`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.editSequence = function (req, res) {
  utility.callApi(`sequenceMessaging/editSequence`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.createMessage = function (req, res) {
  utility.callApi(`sequenceMessaging/createMessage`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.editMessage = function (req, res) {
  utility.callApi(`sequenceMessaging/editMessage`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.setSchedule = function (req, res) {
  utility.callApi(`sequenceMessaging/setSchedule`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.getAll = function (req, res) {
  utility.callApi(`sequenceMessaging/getAll`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.subscribeToSequence = function (req, res) {
  utility.callApi(`sequenceMessaging/subscribeToSequence`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.unsubscribeToSequence = function (req, res) {
  utility.callApi(`sequenceMessaging/unsubscribeToSequence`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.testScheduler = function (req, res) {
  utility.callApi(`sequenceMessaging/testScheduler`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.updateSegmentation = function (req, res) {
  utility.callApi(`sequenceMessaging/updateSegmentation`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.updateTrigger = function (req, res) {
  utility.callApi(`sequenceMessaging/updateTrigger`, 'post', req.body, req.headers.authorization, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
