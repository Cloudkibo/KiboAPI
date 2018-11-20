'use strict'

const express = require('express')

const router = express.Router()

const controller = require('./smartReplies.controller')
// const auth = require('../../../auth/auth.service')
const validate = require('express-jsonschema').validate
const validationSchema = require('./validationSchema')

router.get('/',
  // auth.isAuthenticated(),
  controller.index)

router.get('/waitingReply',
  // auth.isAuthenticated(),
  controller.waitingReply)

router.post('/create',
  // auth.isAuthenticated(),
  validate({body: validationSchema.createPayload}),
  controller.create)

router.post('/edit',
  // auth.isAuthenticated(),
  validate({body: validationSchema.editPayload}),
  controller.edit)

router.post('/delete',
  // auth.isAuthenticated(),
  validate({body: validationSchema.deletePayload}),
  controller.delete)

router.post('/updateStatus',
  // auth.isAuthenticated(),
  validate({body: validationSchema.updateStatusPayload}),
  controller.status)

router.post('/botDetails',
  // auth.isAuthenticated(),
  validate({body: validationSchema.botDetailsPayload}),
  controller.details)

router.post('/fetchUnansweredQueries',
  // auth.isAuthenticated(),
  validate({body: validationSchema.unAnsweredQueriesPayload}),
  controller.unAnsweredQueries)

router.post('/fetchWaitingSubscribers',
  // auth.isAuthenticated(),
  validate({body: validationSchema.waitSubscribersPayload}),
  controller.waitSubscribers)

router.post('/removeWaitingSubscribers',
  // auth.isAuthenticated(),
  validate({body: validationSchema.removeWaitSubscribersPayload}),
  controller.removeWaitSubscribers)

// router.post('/report', controller.report);
// router.post('/send', controller.send);

module.exports = router