const _ = require('lodash')

exports.validateInput = (body) => {
  if (!_.has(body, 'token')) return false
  if (!_.has(body, 'pageId')) return false
  if (!_.has(body, 'webhook_url')) return false
  if (!_.has(body, 'optIn')) return false

  return true
}

exports.validateInputForEdit = (body) => {
  if (!_.has(body, 'token')) return false
  if (!_.has(body, 'webhook_url')) return false
  if (!_.has(body, 'optIn')) return false
  if (!_.has(body, 'webhook_id')) return false

  return true
}
