'use strict'

var express = require('express')
var controller = require('./pageadminsubscriptions.controller')
var auth = require('../../../../auth/auth.service')

var router = express.Router()

router.get('/',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.index)

module.exports = router
