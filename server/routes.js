const config = require('./config/environment/index')
const auth = require('./auth/auth.service')
const dataLayer = require('./api/v1/consumers/consumers.datalayer')
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
  app.get('/', auth.isAuthenticated(), (req, res) => {
    console.log('req.user', req.user)
    res.cookie('environment', config.env,
      {expires: new Date(Date.now() + 900000)})
    // res.sendFile(path.join(config.root, 'client/index.html'))
    res.render('pages/index', { environment: env, user: req.user })
  })

  // second page
  app.get('/product', auth.isAuthenticated(), (req, res) => {
    res.cookie('environment', config.env,
      {expires: new Date(Date.now() + 900000)})
    dataLayer.findOne({companyId: req.user.companyId, userId: req.user._id})
    // dataLayer.findOne({'consumerId.companyId': 'da', 'consumerId.userId': 'sad'})
      .then(consumer => {
        res.render('pages/productAccess', {consumer: consumer, user: req.user})
      })
      .catch(error => {
        return res.status(500).json({
          status: 'failed',
          payload: `Failed to find consumer ${JSON.stringify(error)}`
        })
      })
    // res.sendFile(path.join(config.root, 'client/index.html'))
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
