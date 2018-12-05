/**
 * Created by sojharo on 24/07/2017.
 */
'use strict'

const config = require('../config/environment')
const compose = require('composable-middleware')
const util = require('util')
const logger = require('../components/logger')
const requestPromise = require('request-promise')
const TAG = 'auth/auth.service.js'
const ConsumersDataLayer = require('../api/v1/consumers/consumers.datalayer')

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated () {
  return compose()
  // Validate jwt or api keys
    .use((req, res, next) => {
      logger.serverLog(TAG, `request ${util.inspect(req.headers)}`)
      // allow access_token to be passed through query parameter as well
      // if (req.query && req.query.hasOwnProperty('access_token')) {
      //   req.headers.authorization = `Bearer ${req.query.access_token}`
      // }
      let token = req.headers.cookie.substring(req.headers.cookie.indexOf('=') + 1, req.headers.cookie.indexOf(';'))
      let headers = {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      let path = config.ACCOUNTS_URL.slice(0, config.ACCOUNTS_URL.length - 7)
      let options = {
        method: 'GET',
        uri: `${path}auth/verify`,
        headers,
        json: true
      }
      requestPromise(options)
        .then(result => {
          // logger.serverLog(TAG, `response got ${result}`)
          if (result.status === 'success') {
            req.user = result.user
            next()
          } else {
            return res.status(401)
              .json({status: 'failed', description: 'Unauthorized'})
          }
        })
        .catch(err => {
          return res.status(500)
            .json({status: 'failed', description: `Internal Server Error: ${err}`})
        })
    })
}

function isAuthenticatedExternal () {
  return compose()
  // Validate jwt or api keys
    .use((req, res, next) => {
      if (req.headers.hasOwnProperty('api_secret') && req.headers.hasOwnProperty('api_key')) {
        let credentials = {
          'api_key': req.headers['api_key'],
          'api_secret': req.headers['api_secret']
        }
        ConsumersDataLayer.findOne({credentials})
          .then(consumer => {
            req.consumer = consumer
            next()
          })
          .catch(err => {
            return res.status(401).json({
              status: 'failed ' + err,
              description: 'Unauthorized. Please provide both api_key and api_secret in headers.'
            })
          }
          )
      } else {
        return res.status(401).json({
          status: 'failed',
          description: 'Unauthorized. Please provide both api_key and api_secret in headers.'
        })
      }
    })
}

exports.isAuthenticated = isAuthenticated
exports.isAuthenticatedExternal = isAuthenticatedExternal
