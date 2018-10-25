const express = require('express')
const router = express.Router()
const auth = require('../../../auth/auth.service')

const controller = require('./pages.controller')

router.get('/',
  auth.isAuthenticated(),
  controller.index)

router.get('/allSubscribers',
  auth.isAuthenticated(),
  controller.allSubscribers)

router.get('/allLocales',
  auth.isAuthenticated(),
  controller.allLocales)

router.get('/getAll',
  auth.isAuthenticated(),
  controller.getAll)

router.get('/subscribeBack/:id',
  auth.isAuthenticated(),
  controller.subscribeBack)

module.exports = router