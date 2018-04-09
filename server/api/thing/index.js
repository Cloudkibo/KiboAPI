'use strict'

const express = require('express')

const router = express.Router()
const Sessions = require('./../sessions/sessions.model')
const Subscribers = require('./../subscribers/Subscribers.model')
const LiveChat = require('../livechat/livechat.model')
const CompanyProfile = require('./../companyprofile/companyprofile.model')
const Users = require('./../user/Users.model')

const logger = require('../../components/logger')
const TAG = 'api/thing/index'

router.get('/', (req, res) => {
  res.status(200).json({status: 'success', payload: []})
})

router.get('/subscriptionDate', (req, res) => {
  Sessions.find({}, (err, sessions) => {
    if (err) {
      logger.serverLog(TAG, `ERROR ${JSON.stringify(err)}`)
    }
    sessions.forEach((session) => {
      Subscribers.update({_id: session.subscriber_id}, {datetime: session.request_time}, (err, subs) => {
        if (err) {
          logger.serverLog(TAG, `ERROR ${JSON.stringify(err)}`)
        }
      })
    })
    res.status(200).json({status: 'success', payload: []})
  })
})

router.get('/unSubscribedBy', (req, res) => {
  Subscribers.update({}, {unSubscribedBy: 'subscriber'}, {multi: true}, (err, subs) => {
    if (err) {
      logger.serverLog(TAG, `ERROR ${JSON.stringify(err)}`)
    }
    res.status(200).json({status: 'success', payload: []})
  })
})

router.get('/updateSessions', (req, res) => {
  Sessions.update({}, {is_assigned: false}, {multi: true}, (err, subs) => {
    if (err) {
      logger.serverLog(TAG, `ERROR ${JSON.stringify(err)}`)
    }
    CompanyProfile.find({}, (err, profiles) => {
      if (err) {
        logger.serverLog(TAG, `ERROR ${JSON.stringify(err)}`)
      }
      profiles.forEach((profile) => {
        Users.findOne({_id: profile.ownerId}, (err, user) => {
          if (err) {
            logger.serverLog(TAG, `ERROR ${JSON.stringify(err)}`)
          }
          LiveChat.update({company_id: profile._id}, {replied_by: {id: profile.ownerId, name: user.name, type: 'agent'}}, {multi: true}, (err, updated) => {
            if (err) {
              logger.serverLog(TAG, `ERROR ${JSON.stringify(err)}`)
            }
            logger.serverLog(TAG, `UPDATED ${JSON.stringify(updated)}`)
          })
        })
      })
    })
    res.status(200).json({status: 'success', payload: []})
  })
})

module.exports = router
