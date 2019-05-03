'use strict'

const express = require('express')
const router = express.Router()
const controller = require('./pages.controller')
const auth = require('../../../../auth/auth.service')

router.get('/',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.index)

module.exports = router
