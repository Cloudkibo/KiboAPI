const util = require('util')
const utility = require('../utility')

exports.enable = function (req, res) {
  utility.callApi(`api_settings/enable`, 'post', req.body, req.headers.authorization)
    .then(settings => {
      res.status(200).json({
        status: 'success',
        payload: settings
      })
    })
    .catch(err => {
      res.status(500).json({
        status: 'failed',
        payload: `Failed to enable api settings ${util.inspect(err)}`
      })
    })
}

exports.reset = function (req, res) {
  utility.callApi(`api_settings/reset`, 'post', req.body, req.headers.authorization)
    .then(settings => {
      res.status(200).json({
        status: 'success',
        payload: settings
      })
    })
    .catch(err => {
      res.status(500).json({
        status: 'failed',
        payload: `Failed to reset api settings ${util.inspect(err)}`
      })
    })
}
