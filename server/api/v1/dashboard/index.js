/**
 * Created by sojharo on 27/07/2017.
 */

'use strict'

const express = require('express')

const router = express.Router()

const controller = require('./dashboard.controller')

router.get('/', controller.index)
router.post('/', controller.create)

module.exports = router
