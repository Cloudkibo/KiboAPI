'use strict'

const express = require('express')

const router = express.Router()

const controller = require('./templates.controller')
// const auth = require('../../../../auth/auth.service')
const validationSchema = require('./validationSchema')
const validate = require('express-jsonschema').validate

router.get('/allPolls',
  // auth.isAuthenticated(),
  controller.allPolls)
router.post('/getAllPolls',
  // auth.isAuthenticated(),
  controller.getAllPolls) // pagination
router.get('/allSurveys',
  // authisAuthenticated(),
  controller.allSurveys)
router.post('/getAllSurveys',
  // auth.isAuthenticated(),
  controller.getAllSurveys) // pagination
router.post('/createCategory',
  // auth.isAuthenticated(),
  controller.createCategory)
router.get('/allCategories',
  // auth.isAuthenticated(),
  controller.allCategories)
router.get('/surveyDetails/:surveyid',
  // auth.isAuthenticated(),
  controller.surveyDetails)
router.get('/pollDetails/:pollid',
  // auth.isAuthenticated(),
  controller.pollDetails)
router.delete('/deleteCategory/:id',
  // auth.isAuthenticated(),
  controller.deleteCategory)
router.post('/editCategory',
  // auth.isAuthenticated(),
  validate({body: validationSchema.editCategory}),
  controller.editCategory)

router.post('/createBroadcast',
  // auth.isAuthenticated(),
  controller.createBroadcast)
router.get('/allBroadcasts',
  // auth.isAuthenticated(),
  controller.allBroadcasts)
router.post('/getAllBroadcasts',
  // auth.isAuthenticated(),
  controller.getAllBroadcasts) // pagination
router.post('/editBroadcast',
  // auth.isAuthenticated(),
  controller.editBroadcast)
router.delete('/deleteBroadcast/:id',
  // auth.isAuthenticated(),
  controller.deleteBroadcast)
router.get('/broadcastDetails/:broadcastid',
  // auth.isAuthenticated(),
  controller.broadcastDetails)

module.exports = router
