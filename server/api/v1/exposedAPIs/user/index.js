'use strict'

const express = require('express')
const router = express.Router()
const controller = require('./user.controller')
const auth = require('../../../../auth/auth.service')

router.get('/',
  auth.authenticateUser(),
  controller.index)

module.exports = router
