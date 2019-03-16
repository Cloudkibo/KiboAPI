'use strict'

const express = require('express')

const router = express.Router()

const validate = require('express-jsonschema').validate
const validationSchema = require('./validationSchema')
const controller = require('./broadcasts.controller')
const auth = require('../../../../auth/auth.service')
const multiparty = require('connect-multiparty')
const multipartyMiddleware = multiparty()

router.post('/allBroadcasts',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.allBroadcastsPayload}),
  controller.index)

router.post('/sendConversation',
  auth.isAuthenticatedExternal('kiboengage'),
  multipartyMiddleware,
  controller.sendConversation)

router.post('/upload',
  auth.isAuthenticatedExternal('kiboengage'),
  multipartyMiddleware,
  controller.upload)

router.get('/delete/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.delete)

router.post('/addButton',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.addButtonPayload}),
  controller.addButton)

router.post('/editButton',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.editButtonPayload}),
  controller.editButton)

router.delete('/deleteButton/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.deleteButton)

module.exports = router
