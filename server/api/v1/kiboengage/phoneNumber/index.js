const express = require('express')
const router = express.Router()
const auth = require('../../../../auth/auth.service')
const validate = require('express-jsonschema').validate
const validationSchema = require('./validationSchema')
const controller = require('./phoneNumber.controller')
const multiparty = require('connect-multiparty')
const multipartyMiddleware = multiparty()

router.post('/upload',
  auth.isAuthenticatedExternal('kiboengage'),
  multipartyMiddleware,
  validate({body: validationSchema.uploadPayload}),
  controller.upload)

router.post('/sendNumbers',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.sendNumbersPayload}),
  controller.sendNumbers)

router.get('/pendingSubscription/:name',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.pendingSubscription)

module.exports = router
