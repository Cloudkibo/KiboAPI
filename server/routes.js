const config = require('./config/environment/index')
const dataLayer = require('./api/v1/consumers/consumers.datalayer')
const utility = require('./api/v1/utility/index')
const auth = require('./auth/auth.service')
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
  app.use('/product', require('./api/v1/product/'))

  // internal API
  app.use('/api/consumers', require('./api/v1/consumers'))

  // first page
  app.get('/', auth.isAuthenticated(), (req, res) => {
    res.cookie('environment', config.env,
      {expires: new Date(Date.now() + 900000)})
    setTimeout(function () {
      redirectionLogic(req, res, env)
    }, 3000)
  })

  app.get('/logout', (req, res) => {
    console.log('Request', req.cookies)
    res.clearCookie('token')
    redirectToLogoutAccounts(req, res)
  })

  app.route('/:url(api|auth)/*').get((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
  }).post((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
  })

  app.route('/*').get((req, res) => {
    console.log('Route 2')
    res.redirect('/')
  }).post((req, res) => {
    console.log('Route 3')
    res.redirect('/')
  })
}

function redirectToLogoutAccounts (req, res) {
  console.log(req.get('host'))
  let redirectUrls = {
    'kiboapi': 'https://accounts.cloudkibo.com/auth/logout?continue=https://kiboapi.cloudkibo.com',
    'localhost:3023': 'http://localhost:3024/auth/logout?continue=http://localhost:3023'
  }
  let products = Object.keys(redirectUrls)
  for (let i = 0; i < products.length; i++) {
    if (req.get('host').includes(products[i])) {
      res.redirect(redirectUrls[products[i]])
      break
    }
  }
}
function redirectionLogic (req, res, env, user) {
  console.log('In redirection logic', req.user)
  if (req.user) {
    dataLayer.findOne({'consumerId.userId': req.user._id})
      .then(consumer => {
        if (consumer) {
          res.render('pages/productAccess', {consumer: consumer, user: req.user})
        } else {
          res.render('pages/index', { environment: env, user: req.user })
        }
      })
      .catch(err => {
        console.log('Error in rediretion logic', err)
      })
  } else {
    res.render('pages/index', { environment: env, user: req.user })
  }
}
