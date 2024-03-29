'use strict'

const express = require('express')

const router = express.Router()

const controller = require('./automationQueue.controller')
const auth = require('../../../../auth/auth.service')
const validationSchema = require('./validationSchema')
const validate = require('express-jsonschema').validate

router.post('/',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.indexPayload}),
  controller.index)

router.post('/create',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.createPayload}),
  controller.create)

module.exports = router
