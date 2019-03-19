const express = require('express')
const router = express.Router()
const auth = require('../../../../auth/auth.service')
const validate = require('express-jsonschema').validate

const validationSchema = require('./validationSchema')
const controller = require('./lists.controller')

router.get('/allLists',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.allLists)

router.post('/getAll',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.getAllPayload}),
  controller.getAll)

router.post('/createList',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.createPayload}),
  controller.createList)

router.post('/editList',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.editPayload}),
  controller.editList)

router.get('/viewList/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.viewList)

router.delete('/deleteList/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.deleteList)

router.get('/repliedPollSubscribers',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.repliedPollSubscribers)

router.get('/repliedSurveySubscribers',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.repliedSurveySubscribers)

module.exports = router
