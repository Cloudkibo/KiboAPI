/**
 * Express configuration
 */

'use strict'

const morgan = require('morgan')
const compression = require('compression')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const errorHandler = require('errorhandler')
const helmet = require('helmet')

module.exports = function (app) {
  const env = app.get('env')

  /**
     * middleware to compress response body to optimize app
     * (it is better done on nginx proxy level)
     */

  app.use(compression())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
  app.use(methodOverride())

  // set the view engine to ejs
  app.set('view engine', 'ejs')

  if (env === 'production') {
    /**
         * Helmet can help protect your app from some
         * well-known web vulnerabilities by setting
         * HTTP headers appropriately.
         */
    app.use(helmet())
  }

  if (env === 'development' || env === 'production') {
    /**
         * HTTP request logger
         */

    app.use(morgan('dev'))

    /**
         * Development-only error handler middleware.
         */

    app.use(errorHandler()) // Error handler - has to be last
  }
}
