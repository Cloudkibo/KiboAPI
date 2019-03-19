const callApi = require('../../utility')

exports.allPolls = function (req, res) {
  callApi.callApi(`templates/allPolls`, 'get', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.getAllPolls = function (req, res) {
  callApi.callApi(`templates/getAllPolls`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.getAllSurveys = function (req, res) {
  callApi.callApi(`templates/getAllSurveys`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.allSurveys = function (req, res) {
  callApi.callApi(`templates/allSurveys`, 'get', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.allCategories = function (req, res) {
  callApi.callApi(`templates/allCategories`, 'get', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.createCategory = function (req, res) {
  callApi.callApi(`templates/createCategory`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(201).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.editCategory = function (req, res) {
  callApi.callApi(`templates/editCategory`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.surveyDetails = function (req, res) {
  callApi.callApi(`templates/surveyDetails/${req.params.surveyid}`, 'get', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.pollDetails = function (req, res) {
  callApi.callApi(`templates/pollDetails/${req.params.pollid}`, 'get', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.deleteCategory = function (req, res) {
  callApi.callApi(`templates/deleteCategory/${req.params.id}`, 'delete', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.createBroadcast = function (req, res) {
  callApi.callApi(`templates/createBroadcast`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(201).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.allBroadcasts = function (req, res) {
  callApi.callApi(`templates/allBroadcasts`, 'get', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.getAllPolls = function (req, res) {
  callApi.callApi(`templates/getAllPolls`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.getAllBroadcasts = function (req, res) {
  callApi.callApi(`templates/getAllBroadcasts`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.deleteBroadcast = function (req, res) {
  callApi.callApi(`templates/deleteBroadcast/${req.params.id}`, 'delete', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.editBroadcast = function (req, res) {
  callApi.callApi(`templates/editBroadcast`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.broadcastDetails = function (req, res) {
  callApi.callApi(`templates/broadcastDetails/${req.params.broadcastid}`, 'get', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
