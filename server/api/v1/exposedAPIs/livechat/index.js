'use strict'

const express = require('express')
const router = express.Router()
const controller = require('./livechat.controller')
const auth = require('../../../../auth/auth.service')

router.post('/sendMessage',
  auth.isAuthenticatedExternal('kibochat'),
  controller.sendMessage)

router.post('/sendMessageUsingRefId',
  auth.isAuthenticatedExternal('kibochat'),
  controller.sendMessage)

module.exports = router
