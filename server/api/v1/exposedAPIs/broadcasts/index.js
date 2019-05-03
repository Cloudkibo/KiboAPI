'use strict'

const express = require('express')
const router = express.Router()
const controller = require('./broadcasts.controller')
const auth = require('../../../../auth/auth.service')

router.post('/sendBroadcast',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.sendBroadcast)

module.exports = router
