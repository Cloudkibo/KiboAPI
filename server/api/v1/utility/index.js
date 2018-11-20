const requestPromise = require('request-promise')
const config = require('../../../config/environment/index')

exports.callApi = (endpoint, method = 'get', body, token, type = 'accounts') => {
  let headers
  if (token) {
    headers = {
      'content-type': 'application/json',
      'Authorization': token
    }
  } else {
    headers = {
      'content-type': 'application/json',
      'is_kibo_product': true
    }
  }
  let apiUrl = config.ACCOUNTS_URL
  if (type === 'kiboengage') {
    apiUrl = config.KIBOENGAGE_URL
  } else if (type === 'kibochat') {
    apiUrl = config.KIBOCHAT_URL
  }
  let options = {
    method: method.toUpperCase(),
    uri: `${apiUrl}${endpoint}`,
    headers,
    body,
    json: true
  }
  // logger.serverLog(TAG, `requestPromise body ${util.inspect(body)}`)
  return requestPromise(options).then(response => {
    // logger.serverLog(TAG, `response from accounts ${util.inspect(response)}`)
    return new Promise((resolve, reject) => {
      if (response.status === 'success') {
        resolve(response.payload)
      } else {
        reject(response.payload)
      }
    })
  })
}