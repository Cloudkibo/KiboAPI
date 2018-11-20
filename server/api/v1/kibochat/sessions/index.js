const express = require('express')
const router = express.Router()
const validate = require('express-jsonschema').validate
//  const auth = require('../../../auth/auth.service')

const validationSchema = require('./validationSchema')
const controller = require('./sessions.controller')

router.get('/',
  // auth.isAuthenticated(),
  // auth.doesPlanPermitsThisAction('livechat'),
  // auth.doesRolePermitsThisAction('livechatPermission'),
  controller.index)

router.post('/getOpenSessions',
  // auth.isAuthenticated(),
  // auth.doesPlanPermitsThisAction('livechat'),
  // auth.doesRolePermitsThisAction('livechatPermission'),
  validate({body: validationSchema.openSessionsPayload}),
  controller.getNewSessions)

router.post('/getClosedSessions',
  // auth.isAuthenticated(),
  // auth.doesPlanPermitsThisAction('livechat'),
  // auth.doesRolePermitsThisAction('livechatPermission'),
  validate({body: validationSchema.openSessionsPayload}),
  controller.getResolvedSessions)

router.get('/markread/:id',
  // auth.isAuthenticated(),
  // auth.doesPlanPermitsThisAction('livechat'),
  // auth.doesRolePermitsThisAction('livechatPermission'),
  controller.markread)

router.get('/:id',
  // auth.isAuthenticated(),
  // auth.doesPlanPermitsThisAction('livechat'),
  // auth.doesRolePermitsThisAction('livechatPermission'),
  controller.show)

router.post('/changeStatus',
  // auth.isAuthenticated(),
  // auth.doesPlanPermitsThisAction('livechat'),
  // auth.doesRolePermitsThisAction('livechatPermission'),
  validate({body: validationSchema.changeStatusPayload}),
  controller.changeStatus)

router.post('/assignAgent',
  // auth.isAuthenticated(),
  // auth.doesPlanPermitsThisAction('livechat'),
  // auth.doesRolePermitsThisAction('livechatPermission'),
  validate({body: validationSchema.assignAgentPayload}),
  controller.assignAgent)

router.post('/assignTeam',
  // auth.isAuthenticated(),
  // auth.doesPlanPermitsThisAction('livechat'),
  // auth.doesRolePermitsThisAction('livechatPermission'),
  validate({body: validationSchema.assignTeamPayload}),
  controller.assignTeam)

router.post('/unSubscribe',
  // auth.isAuthenticated(),
  // auth.doesPlanPermitsThisAction('livechat'),
  // auth.doesRolePermitsThisAction('livechatPermission'),
  validate({body: validationSchema.unSubscribePayload}),
  controller.unSubscribe)

router.post('/query',
  // auth.isAuthenticated(),
  // auth.doesPlanPermitsThisAction('livechat'),
  // auth.doesRolePermitsThisAction('livechatPermission'),
  controller.genericFind)

module.exports = router