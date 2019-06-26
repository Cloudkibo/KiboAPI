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
const apiCaller = require('../api/v1/utility')
const ConsumersDataLayer = require('../api/v1/consumers/consumers.datalayer')

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated () {
  return compose()
  // Validate jwt or api keys
    .use((req, res, next) => {
      if (req.headers.hasOwnProperty('api_key')) {
        validateApiKeys(req, res, next)
      } else {
        // allow access_token to be passed through query parameter as well
        console.log('Req Cookies Token', req.cookies.token)
        if (req.cookies.token) {
          req.headers.authorization = `Bearer ${req.cookies.token}`
          if (req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = `Bearer ${req.query.access_token}`
          }
          let headers = {
            'content-type': 'application/json',
            'Authorization': req.headers.authorization
          }
          let path = config.api_urls['accounts'].slice(0, config.api_urls['accounts'].length - 7)
          let options = {
            method: 'GET',
            uri: `${path}/auth/verify`,
            headers,
            json: true
          }

          requestPromise(options)
            .then(result => {
              // logger.serverLog(TAG, `response got ${result}`)
              console.log(`response got`, result)
              if (result.status === 'success') {
                req.user = result.user
                next()
              } else {
                return res.status(401)
                  .json({status: 'failed', description: 'Unauthorized'})
              }
            })
            .catch(err => {
              if (err.statusCode && err.statusCode === 401) {
                return res.status(401)
                  .json({status: 'Unauthorized', description: 'jwt expired'})
              } else {
                return res.status(500)
                  .json({status: 'failed', description: `Internal Server Error: ${err}`})
              }
            })
        } else {
          next()
        }
      }
    })
}

function validateApiKeys (req, res, next) {
  return compose()
  // Validate jwt or api keys
    .use((req, res, next) => {
      if (req.headers.hasOwnProperty('api_secret') && req.headers.hasOwnProperty('api_key')) {
        let credentials = {
          'api_key': req.headers['api_key'],
          'api_secret': req.headers['api_secret']
        }
        console.log('Credentials', credentials)
        ConsumersDataLayer.findOne({credentials})
          .then(consumer => {
            console.log('Consumer', consumer)
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

function authenticateUser (req, res, next) {
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
            if (consumer) {
              req.consumer = consumer
              next()
            } else {
              return res.status(401).json({
                status: 'failed',
                description: 'Unauthorized. Please provide correct api_key and api_secret in headers.'
              })
            }
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

function isAuthenticatedExternal (product) {
  return compose()
  // Validate jwt or api keys
    .use((req, res, next) => {
      if (req.headers.hasOwnProperty('api_secret') && req.headers.hasOwnProperty('api_key')) {
        let credentials = {
          'api_key': req.headers['api_key'],
          'api_secret': req.headers['api_secret']
        }
        console.log('Credentials', credentials)
        ConsumersDataLayer.findOne({credentials})
          .then(consumer => {
            console.log('Consumer', consumer)
            let scope = consumer.scope
            console.log('Scope', product, scope[product])
            if (scope[product]) {
              req.consumer = consumer
              req.headers['consumer_id'] = consumer.consumerId.userId
              next()
            } else {
              return res.status(401).json({
                status: 'failed ',
                description: `Access for the Product - ${product} - denied. API is not enabled from developer dashboard`
              })
            }
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
exports.authenticateUser = authenticateUser
exports.isAuthenticated = isAuthenticated
exports.isAuthenticatedExternal = isAuthenticatedExternal
