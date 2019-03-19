'use strict'
const utility = require('../../utility')

// Get list of companyprofiles
exports.index = function (req, res) {
  utility.callApi(`adminsubscriptions`, 'get', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(200).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
