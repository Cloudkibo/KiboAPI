const express = require('express')
const router = express.Router()
const validate = require('express-jsonschema').validate

const validationSchema = require('./validationSchema')
const controller = require('./consumers.controller')
const auth = require('../../../auth/auth.service')

router.post('/updateProductStatus',
  validate({body: validationSchema.updateProductStatusPayload}),
  controller.updateProductStatus)

router.post('/enableAPI',
  auth.isAuthenticated(),
  controller.enable)

router.post('/resetAPI',
  auth.isAuthenticated(),
  controller.reset)

module.exports = router
