'use strict'

const express = require('express')

const router = express.Router()

const controller = require('./autopostingMessages.controller')
const auth = require('../../../../auth/auth.service')
const validationSchema = require('./validationSchema')
const validate = require('express-jsonschema').validate

router.post('/getMessages/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.getMessagePayload}),
  controller.getMessages)

module.exports = router
