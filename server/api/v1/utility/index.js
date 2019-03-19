const requestPromise = require('request-promise')
const config = require('../../../config/environment/index')
exports.callApi = (endpoint, method = 'get', body, consumerId, type = 'accounts') => {
  let headers
  if (consumerId && consumerId !== '') {
    headers = {
      'content-type': 'application/json',
      'consumer_id': consumerId
    }
  } else {
    headers = {
      'content-type': 'application/json',
      'is_kibo_product': true
    }
  }
  let apiUrl = config.api_urls[type]
  // console.log('apiUrl: ', apiUrl)
  let options = {
    method: method.toUpperCase(),
    uri: `${apiUrl}/${endpoint}`,
    headers,
    body,
    json: true
  }
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

exports.getLoggedInUser = (req, res, env, redirectionLogic) => {
  let headers
  headers = {
    'content-type': 'application/json',
    'Authorization': `Bearer ${req.cookies.token}`
  }
  let body = {}
  let apiUrl = config.api_urls['accounts'].slice(0, config.api_urls['accounts'].length - 7)
  let options = {
    method: 'GET',
    uri: `${apiUrl}/auth/verify`,
    headers,
    body,
    json: true
  }
  requestPromise(options)
    .then(result => {
      if (result.status === 'success') {
        redirectionLogic(req, res, env, result.user)
      }
    })
    .catch(err => {
      console.log(err)
    })
}
