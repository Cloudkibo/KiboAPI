const express = require('express')
const router = express.Router()
const auth = require('../../../../auth/auth.service')
const validate = require('express-jsonschema').validate

const validationSchema = require('./validationSchema')
const controller = require('./webhooks.controller')

router.get('/',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.index)

router.post('/create',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.createSchema}),
  controller.create)

router.post('/edit',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.editSchema}),
  controller.edit)

router.post('/enabled',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.enabledSchema}),
  controller.isEnabled)

module.exports = router
