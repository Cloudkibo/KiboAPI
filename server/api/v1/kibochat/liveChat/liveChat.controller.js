const utility = require('../../utility')

exports.index = function (req, res) {
  utility.callApi(`livechat/${req.params.session_id}`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.search = function (req, res) {
  utility.callApi(`livechat/search`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.update = function (req, res) {
  utility.callApi(`livechat/updateUrl`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.geturlmeta = function (req, res) {
  utility.callApi(`livechat/getUrlMeta`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

/*
*  Create function has the following steps:
* 1. Finds company user
* 2. Creates Message Object and send webhook response
* 3. Finds and update session object
* 4. Finds subscriber details.
* 5. Update Bot Block list
* 6. Create AutomationQueue Object
*/
exports.create = function (req, res) {
  utility.callApi(`livechat`, 'post', req.body, req.headers.consumer_id, 'kibochat')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
