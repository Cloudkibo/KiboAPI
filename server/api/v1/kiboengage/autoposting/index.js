'use strict'

const express = require('express')

const router = express.Router()

const controller = require('./autoposting.controller')
const auth = require('../../../../auth/auth.service')
const validationSchema = require('./validationSchema')
const validate = require('express-jsonschema').validate

router.get('/',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.index)

router.post('/create',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.createPayload}),
  controller.create)

router.post('/edit',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.editPayload}),
  controller.edit)

router.delete('/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.destroy)

module.exports = router
