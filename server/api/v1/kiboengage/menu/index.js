
'use strict'

const express = require('express')
const router = express.Router()
const controller = require('./menu.controller')
const auth = require('../../../../auth/auth.service')

router.get('/',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.index)

router.post('/indexByPage',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.indexByPage)

router.post('/create',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.create)

module.exports = router
