/**
 * Created by sojharo on 25/09/2017.
 */

const logger = require('../../components/logger')
const TAG = 'api/backdoor/backdoor.controller.js'

const Users = require('../user/Users.model')
const Pages = require('../pages/Pages.model')
const Subscribers = require('../subscribers/Subscribers.model')
const Broadcasts = require('../broadcasts/broadcasts.model')
const Polls = require('../polls/Polls.model')
const Surveys = require('../surveys/surveys.model')

exports.index = function (req, res) {
  logger.serverLog(TAG, 'Backdoor get all users api is working')
  Users.find({_id: {$ne: req.user._id}}, (err, users) => {
    if (err) {
      return res.status(404).json({
        status: 'failed',
        description: `Error in getting users ${JSON.stringify(err)}`
      })
    }
    logger.serverLog(TAG, `Total users ${users.length}`)
    res.status(200).json({
      status: 'success',
      payload: users
    })
  })
}

exports.allpages = function (req, res) {
  logger.serverLog(TAG, 'Backdoor get all pages api is working')
  Pages.find({userId: req.params.userid}, (err, pages) => {
    if (err) {
      return res.status(404).json({
        status: 'failed',
        description: `Error in getting pages ${JSON.stringify(err)}`
      })
    }
    logger.serverLog(TAG, `Total pages ${pages.length}`)
    res.status(200).json({
      status: 'success',
      payload: pages
    })
  })
}

exports.allsubscribers = function (req, res) {
  logger.serverLog(TAG, 'Backdoor get all subscribers api is working')
  Subscribers.find({pageId: req.params.pageid}, (err, subscribers) => {
    if (err) {
      return res.status(404).json({
        status: 'failed',
        description: `Error in getting subscribers ${JSON.stringify(err)}`
      })
    }
    logger.serverLog(TAG, `Total subscribers ${subscribers.length}`)
    res.status(200).json({
      status: 'success',
      payload: subscribers
    })
  })
}

exports.allbroadcasts = function (req, res) {
  logger.serverLog(TAG, 'Backdoor get all broadcasts api is working')
  // todo put pagination for scaling
  Broadcasts.find({userId: req.params.userid}, (err, broadcasts) => {
    if (err) {
      return res.status(404).json({
        status: 'failed',
        description: `Error in getting broadcasts ${JSON.stringify(err)}`
      })
    }
    logger.serverLog(TAG, `Total broadcasts ${broadcasts.length}`)
    res.status(200).json({
      status: 'success',
      payload: broadcasts
    })
  })
}

exports.allpolls = function (req, res) {
  logger.serverLog(TAG, 'Backdoor get all polls api is working')
  // todo put pagination for scaling
  Polls.find({userId: req.params.userid}, (err, polls) => {
    if (err) {
      return res.status(404).json({
        status: 'failed',
        description: `Error in getting polls ${JSON.stringify(err)}`
      })
    }
    logger.serverLog(TAG, `Total polls ${polls.length}`)
    res.status(200).json({
      status: 'success',
      payload: polls
    })
  })
}

exports.allsurveys = function (req, res) {
  logger.serverLog(TAG, 'Backdoor get all surveys api is working')
  // todo put pagination for scaling
  Surveys.find({userId: req.params.userid}, (err, surveys) => {
    if (err) {
      return res.status(404).json({
        status: 'failed',
        description: `Error in getting surveys ${JSON.stringify(err)}`
      })
    }
    logger.serverLog(TAG, `Total surveys ${surveys.length}`)
    res.status(200).json({
      status: 'success',
      payload: surveys
    })
  })
}