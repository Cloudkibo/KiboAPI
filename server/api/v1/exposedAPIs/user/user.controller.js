const utility = require('../../utility')

exports.index = function (req, res) {
  utility.callApi(`user/query`, 'post', {_id: req.consumer.consumerId.userId}, req.headers.consumer_id)
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
