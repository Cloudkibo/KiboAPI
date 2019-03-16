'use strict'

const express = require('express')

const router = express.Router()

const controller = require('./sequenceMessaging.controller')
const auth = require('../../../../auth/auth.service')
const validationSchema = require('./validationSchema')
const validate = require('express-jsonschema').validate

router.get('/allMessages/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.allMessages)

router.get('/subscriberSequences/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.subscriberSequences)

router.get('/allSequences',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.allSequences)

router.delete('/deleteSequence/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.deleteSequence)

router.delete('/deleteMessage/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.deleteMessage)

router.post('/createMessage',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.createMessagePayload}),
  controller.createMessage)

router.post('/editMessage',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.editMessagePayload}),
  controller.editMessage)

router.post('/setSchedule',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.setSchedulePayload}),
  controller.setSchedule)

router.post('/createSequence',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.createSequencePayload}),
  controller.createSequence)

router.post('/editSequence',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.editSequencePayload}),
  controller.editSequence)

router.post('/getAll',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.getAllPayload}),
  controller.getAll) // pagination

router.post('/subscribeToSequence',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.subscribeToSequencePayload}),
  controller.subscribeToSequence)

router.post('/unsubscribeToSequence',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.unsubscribeToSequencePayload}),
  controller.unsubscribeToSequence)

router.post('/testScheduler',
  validate({body: validationSchema.testSchedulerPayload}),
  controller.testScheduler)

router.post('/updateTrigger',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.updateTriggerPayload}),
  controller.updateTrigger)

router.post('/updateSegmentation',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.updateSegmentationPayload}),
  controller.updateSegmentation)

module.exports = router
