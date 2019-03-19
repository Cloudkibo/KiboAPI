'use strict'

const express = require('express')

const router = express.Router()

const controller = require('./templates.controller')
const auth = require('../../../../auth/auth.service')
const validationSchema = require('./validationSchema')
const validate = require('express-jsonschema').validate

router.get('/allPolls',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.allPolls)
router.post('/getAllPolls',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.getAllPolls) // pagination
router.get('/allSurveys',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.allSurveys)
router.post('/getAllSurveys',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.getAllSurveys) // pagination
router.post('/createCategory',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.createCategory)
router.get('/allCategories',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.allCategories)
router.get('/surveyDetails/:surveyid',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.surveyDetails)
router.get('/pollDetails/:pollid',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.pollDetails)
router.delete('/deleteCategory/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.deleteCategory)
router.post('/editCategory',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.editCategory}),
  controller.editCategory)

router.post('/createBroadcast',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.createBroadcast)
router.get('/allBroadcasts',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.allBroadcasts)
router.post('/getAllBroadcasts',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.getAllBroadcasts) // pagination
router.post('/editBroadcast',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.editBroadcast)
router.delete('/deleteBroadcast/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.deleteBroadcast)
router.get('/broadcastDetails/:broadcastid',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.broadcastDetails)

module.exports = router
