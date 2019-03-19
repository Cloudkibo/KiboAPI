'use strict'

const express = require('express')
const router = express.Router()
const controller = require('./liveChat.controller')
const auth = require('../../../../auth/auth.service')
const validate = require('express-jsonschema').validate
const validationSchema = require('./validationSchema')

router.post('/',
  auth.isAuthenticatedExternal('kibochat'),
  validate({body: validationSchema.createPayload}),
  controller.create)

router.post('/updateUrl',
  auth.isAuthenticatedExternal('kibochat'),
  controller.update)

router.post('/getUrlMeta',
  auth.isAuthenticatedExternal('kibochat'),
  validate({body: validationSchema.urlMetaPayload}),
  controller.geturlmeta)

router.post('/search',
  auth.isAuthenticatedExternal('kibochat'),
  validate({body: validationSchema.searchPayload}),
  controller.search)

router.post('/:session_id',
  auth.isAuthenticatedExternal('kibochat'),
  controller.index)

module.exports = router
