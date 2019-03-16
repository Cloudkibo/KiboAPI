'use strict'

const express = require('express')

const router = express.Router()
const validate = require('express-jsonschema').validate
const controller = require('./polls.controller')
const auth = require('../../../../auth/auth.service')
const validationSchema = require('./validationSchema')

router.get('/all/:days',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.index)

router.post('/allPolls',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.allPollsPayload}),
  controller.allPolls)

router.post('/create',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.createPayload}),
  controller.create)

router.post('/send',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.createPayload}),
  controller.send)

router.post('/sendPollDirectly',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.createPayload}),
  controller.sendPoll)

router.get('/responses/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.getresponses)

router.get('/allResponses',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.getAllResponses)

router.delete('/deletePoll/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.deletePoll)

module.exports = router
