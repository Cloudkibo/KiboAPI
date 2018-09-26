'use strict'

const express = require('express')

const router = express.Router()

const controller = require('./growthTools.controller')
const auth = require('../../../auth/auth.service')

const multiparty = require('connect-multiparty')
const multipartyMiddleware = multiparty()

router.post('/upload',
  auth.isAuthenticated(),
  auth.doesPlanPermitsThisAction('customer_matching'),
  auth.doesRolePermitsThisAction('customerMatchingPermission'),
  multipartyMiddleware,
  controller.upload)

router.post('/sendMessage',
  auth.isAuthenticated(),
  auth.doesPlanPermitsThisAction('customer_matching'),
  auth.doesRolePermitsThisAction('customerMatchingPermission'),
  multipartyMiddleware,
  controller.sendMessage)

router.post('/sendNumbers',
  auth.isAuthenticated(),
  // auth.doesPlanPermitsThisAction('customer_matching'),
  // auth.doesRolePermitsThisAction('customerMatchingPermission'),
  controller.sendNumbers)

router.get('/retrievePhoneNumbers',
  auth.isAuthenticated(),
  auth.doesPlanPermitsThisAction('customer_matching'),
  auth.doesRolePermitsThisAction('customerMatchingPermission'),
  controller.retrievePhoneNumbers)

router.get('/pendingSubscription/:name',
    auth.isAuthenticated(),
    auth.doesPlanPermitsThisAction('customer_matching'),
    auth.doesRolePermitsThisAction('customerMatchingPermission'),
    controller.pendingSubscription)

module.exports = router
