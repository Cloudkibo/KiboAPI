const utility = require('../utility')

exports.index = function (req, res) {
  let query = [
    { $match: {companyId: req.consumer.consumerId.companyId, connected: true} },
    { $project: { pageName: 1, _id: 1, pageId: 1, connected: 1 } }
  ]
  utility.callApi(`pages/aggregate`, 'post', query, req.headers.consumer_id)
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
