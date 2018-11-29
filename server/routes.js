const config = require('./config/environment/index')

module.exports = function (app) {
  const env = app.get('env')
  // Exposed API middlewares go here
  app.use('/api/livechat', require('./api/v1/kibochat/liveChat'))
  app.use('/api/sessions', require('./api/v1/kibochat/sessions'))
  app.use('/api/bots', require('./api/v1/kibochat/smartReplies'))
  app.use('/api/automationQueue', require('./api/v1/kiboengage/automationQueue'))
  app.use('/api/autoposting', require('./api/v1/kiboengage/autoposting'))
  app.use('/api/autoposting_messages', require('./api/v1/kiboengage/autopostingMessages'))
  app.use('/api/broadcasts', require('./api/v1/kiboengage/broadcasts'))
  app.use('/api/post', require('./api/v1/kiboengage/commentCapture'))
  app.use('/api/lists', require('./api/v1/kiboengage/lists'))
  app.use('/api/menu', require('./api/v1/kiboengage/menu'))
  app.use('/api/adminsubscriptions', require('./api/v1/kiboengage/pageadminsubscriptions'))
  app.use('/api/growthtools', require('./api/v1/kiboengage/phoneNumber'))
  app.use('/api/polls', require('./api/v1/kiboengage/polls'))
  app.use('/api/sequenceMessaging', require('./api/v1/kiboengage/sequenceMessaging'))
  app.use('/api/surveys', require('./api/v1/kiboengage/surveys'))
  app.use('/api/templates', require('./api/v1/kiboengage/templates'))
  app.use('/api/webhooks', require('./api/v1/kiboengage/webhooks'))

  // internal API
  app.use('/api/consumers', require('./api/v1/consumers'))

  // first page
  app.get('/', (req, res) => {
    console.log('req.user', req)
    res.cookie('environment', config.env,
      {expires: new Date(Date.now() + 900000)})
    // res.sendFile(path.join(config.root, 'client/index.html'))
    res.render('pages/index', { environment: env })
  })

  // second page
  app.get('/product', (req, res) => {
    res.cookie('environment', config.env,
      {expires: new Date(Date.now() + 900000)})
    // res.sendFile(path.join(config.root, 'client/index.html'))
    res.render('pages/productAccess')
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
}
