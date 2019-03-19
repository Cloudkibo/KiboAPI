const utility = require('../../utility')

exports.getMessages = function (req, res) {
  utility.callApi(`autoposting_messages/getMessages/${req.params.id}`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
