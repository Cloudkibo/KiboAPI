const express = require('express')
const router = express.Router()
const validate = require('express-jsonschema').validate

const validationSchema = require('./validationSchema')
const controller = require('./test.controller')

router.post('/updateProductStatus',
  validate({body: validationSchema.updateProductStatusPayload}),
  controller.updateProductStatus)

module.exports = router
