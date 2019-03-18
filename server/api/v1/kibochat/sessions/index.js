const express = require('express')
const router = express.Router()
const validate = require('express-jsonschema').validate
const auth = require('../../../../auth/auth.service')

const validationSchema = require('./validationSchema')
const controller = require('./sessions.controller')

router.get('/',
  auth.isAuthenticatedExternal('kibochat'),
  controller.index)

router.post('/getOpenSessions',
  auth.isAuthenticatedExternal('kibochat'),
  validate({body: validationSchema.openSessionsPayload}),
  controller.getNewSessions)

router.post('/getClosedSessions',
  auth.isAuthenticatedExternal('kibochat'),
  validate({body: validationSchema.openSessionsPayload}),
  controller.getResolvedSessions)

router.get('/markread/:id',
  auth.isAuthenticatedExternal('kibochat'),
  controller.markread)

router.get('/:id',
  auth.isAuthenticatedExternal('kibochat'),
  controller.show)

router.post('/changeStatus',
  auth.isAuthenticatedExternal('kibochat'),
  validate({body: validationSchema.changeStatusPayload}),
  controller.changeStatus)

router.post('/assignAgent',
  auth.isAuthenticatedExternal('kibochat'),
  validate({body: validationSchema.assignAgentPayload}),
  controller.assignAgent)

router.post('/assignTeam',
  auth.isAuthenticatedExternal('kibochat'),
  validate({body: validationSchema.assignTeamPayload}),
  controller.assignTeam)

/* router.post('/unSubscribe',
  auth.isAuthenticatedExternal('kibochat'),
  validate({body: validationSchema.unSubscribePayload}),
  controller.unSubscribe) */

router.post('/query',
  auth.isAuthenticatedExternal('kibochat'),
  controller.genericFind)

module.exports = router
