'use strict'

const express = require('express')

const router = express.Router()

const controller = require('./smartReplies.controller')
const auth = require('../../../../auth/auth.service')
const validate = require('express-jsonschema').validate
const validationSchema = require('./validationSchema')

router.get('/',
  auth.isAuthenticatedExternal('kibochat'),
  controller.index)

router.get('/waitingReply',
  auth.isAuthenticatedExternal('kibochat'),
  controller.waitingReply)

router.post('/create',
  auth.isAuthenticatedExternal('kibochat'),
  validate({body: validationSchema.createPayload}),
  controller.create)

router.post('/edit',
  auth.isAuthenticatedExternal('kibochat'),
  validate({body: validationSchema.editPayload}),
  controller.edit)

router.post('/delete',
  auth.isAuthenticatedExternal('kibochat'),
  validate({body: validationSchema.deletePayload}),
  controller.delete)

router.post('/updateStatus',
  auth.isAuthenticatedExternal('kibochat'),
  validate({body: validationSchema.updateStatusPayload}),
  controller.status)

router.post('/botDetails',
  auth.isAuthenticatedExternal('kibochat'),
  validate({body: validationSchema.botDetailsPayload}),
  controller.details)

router.post('/fetchUnansweredQueries',
  auth.isAuthenticatedExternal('kibochat'),
  validate({body: validationSchema.unAnsweredQueriesPayload}),
  controller.unAnsweredQueries)

router.post('/fetchWaitingSubscribers',
  auth.isAuthenticatedExternal('kibochat'),
  validate({body: validationSchema.waitSubscribersPayload}),
  controller.waitSubscribers)

router.post('/removeWaitingSubscribers',
  auth.isAuthenticatedExternal('kibochat'),
  validate({body: validationSchema.removeWaitSubscribersPayload}),
  controller.removeWaitSubscribers)

// router.post('/report', controller.report);
// router.post('/send', controller.send);

module.exports = router
