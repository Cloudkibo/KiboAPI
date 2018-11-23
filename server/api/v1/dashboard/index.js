
const express = require('express')
const router = express.Router()
const validate = require('express-jsonschema').validate
const auth = require('../../../auth/auth.service')

const validationSchema = require('./validationSchema')
const controller = require('./test.controller')

router.post('/enableAPI',
  auth.isAuthenticated(),
  validate({body: validationSchema.indexPayload}),
  controller.enable)

router.post('/resetAPI',
  auth.isAuthenticated(),
  validate({body: validationSchema.indexPayload}),
  controller.reset)
