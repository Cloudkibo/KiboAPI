process.env.NODE_ENV = process.env.NODE_ENV || 'development' // production

const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/environment/index')
const swaggerTools = require('swagger-tools')

const app = express()
const httpApp = express()

const appObj = (config.env === 'production' || config.env === 'staging') ? app : httpApp

mongoose.connect(config.mongo.uri, config.mongo.options)

// require('./config/express')(appObj)
// require('./config/setup')(appObj, config)
// require('./routes')(appObj)

const swaggerDoc = require('./config/swagger/kibopush.json')

swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  // app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  // app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  // app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi())
  httpApp.use(middleware.swaggerUi())

  require('./config/express')(appObj)
  require('./config/setup')(app, httpApp, config)
  require('./routes')(appObj)
})

process.on('uncaughtException', function (exception) {
  console.log(exception)
})
