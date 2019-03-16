const express = require('express')
const router = express.Router()
const auth = require('../../../../auth/auth.service')
const validate = require('express-jsonschema').validate

const validationSchema = require('./validationSchema')
const controller = require('./commentCapture.controller')

router.get('/',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.index)

router.get('/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.viewPost)

router.post('/create',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.create)

router.post('/edit',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.postUpdatePayload}),
  controller.edit)

router.delete('/delete/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.delete)

module.exports = router
