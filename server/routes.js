/**
 * Created by sojharo on 20/07/2017.
 */

/**
 * Main application routes
 */

'use strict'

const path = require('path')
const config = require('./config/environment/index')
const Raven = require('raven')

module.exports = function (app) {
  const env = app.get('env')
  app.use('/api/dashboard/', require('./api/v1/dashboard'))
  //  app.use('/auth', require('./auth'))

  app.get('/', (req, res) => {
    res.cookie('environment', config.env,
      {expires: new Date(Date.now() + 900000)})
    // res.sendFile(path.join(config.root, 'client/index.html'))
    res.render('main', { environment: env })
  })

  app.get('/dashboard2', (req, res) => {
    res.sendFile(path.join(config.root, 'client/index.html'))
  })

  app.route('/:url(api|auth)/*').get((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
  }).post((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
  })

  app.route('/*').get((req, res) => {
    res.redirect('/')
  }).post((req, res) => {
    res.redirect('/')
  })

  if (env === 'production' || env === 'staging') {
    app.use(Raven.errorHandler())
  }
}
