'use strict'

const express = require('express')

const router = express.Router()
const validate = require('express-jsonschema').validate

const controller = require('./surveys.controller')
const auth = require('../../../../auth/auth.service')
const validationSchema = require('./validationSchema')

router.post('/allSurveys',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.createPayload}),
  controller.allSurveys)

router.post('/create',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.createPayload}),
  controller.create)

router.post('/edit',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.createPayload}),
  controller.edit)

router.post('/send',
  auth.isAuthenticatedExternal('kiboengage'),
  validate({body: validationSchema.createPayload}),
  controller.send)

router.post('/sendSurveyDirectly',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.sendSurvey)

//  router.post('/submitresponse', controller.submitresponse)

router.get('/showquestions/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.showQuestions)

router.get('/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.show) // show survey and responses of the survey

router.delete('/deleteSurvey/:id',
  auth.isAuthenticatedExternal('kiboengage'),
  controller.deleteSurvey) // show survey and responses of the survey

module.exports = router
