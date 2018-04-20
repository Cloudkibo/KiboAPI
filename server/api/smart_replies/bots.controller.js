/**
 * Created by sojharo on 27/07/2017.
 */

// eslint-disable-next-line no-unused-vars
const logger = require('../../components/logger')
// const Workflows = require('./Workflows.model')
// eslint-disable-next-line no-unused-vars
const TAG = 'api/smart_replies/bots.controller.js'
const Bots = require('./Bots.model')
let request = require('request')
const WIT_AI_TOKEN = 'RQC4XBQNCBMPETVHBDV4A34WSP5G2PYL'

exports.index = function (req, res) {
  Bots
    .find({
      userId: req.user._id
    }).populate('pageId').exec((err, bots) => {
      if (err) {
        return res.status(500).json({
          status: 'failed',
          description: `Internal Server Error ${JSON.stringify(err)}`
        })
      }
      return res.status(200).json({status: 'success', payload: bots })
    })
}

exports.create = function (req, res) {
  var uniquebotName = req.body.botName + req.user._id + Date.now()
  request(
    {
      'method': 'POST',
      'uri': 'https://api.wit.ai/apps?v=20170307',
      headers: {
        'Authorization': 'Bearer ' + WIT_AI_TOKEN,
        'Content-Type': 'application/json'
      },
      body: {
        'name': uniquebotName,
        'lang': 'en',
        'private': 'false'
      },
      json: true
    },
      (err, witres) => {
        if (err) {
          return logger.serverLog(TAG,
            'Error Occured In Creating WIT.AI app')
          // return res.status(500).json({status: 'failed', payload: {error: err}})
        } else {
          if (witres.statusCode !== 200) {
            logger.serverLog(TAG,
              `Error Occured in creating Wit ai app ${JSON.stringify(
                witres.body.errors)}`)
            return res.status(500).json({status: 'failed', payload: {error: witres.body.errors}})
          } else {
            logger.serverLog(TAG,
              'Wit.ai app created successfully', witres.body)

            const bot = new Bots({
              pageId: req.body.pageId, // TODO ENUMS
              userId: req.user._id,
              botName: req.body.botName,
              witAppId: witres.body.app_id,
              witToken: witres.body.access_token,
              witAppName: uniquebotName,
              isActive: req.body.isActive
            })

            bot.save((err, newbot) => {
              if (err) {
                res.status(500).json({
                  status: 'Failed',
                  error: err,
                  description: 'Failed to insert record'
                })
              } else {
                return res.status(200).json({status: 'success', payload: newbot})
              }
            })
          }
        }
      })

      // save model to MongoDB
}

exports.edit = function (req, res) {
  logger.serverLog(TAG,
              `Adding questions in edit bot ${JSON.stringify(req.body)}`)
  Bots.update({_id: req.body.botId}, {payload: req.body.payload}, function (err, affected) {
    console.log('affected rows %d', affected)
    return res.status(200).json({status: 'success'})
  })
}

exports.status = function (req, res) {
  logger.serverLog(TAG,
              `Updating bot status ${JSON.stringify(req.body)}`)
  Bots.update({_id: req.body.botId}, {isActive: req.body.isActive}, function (err, affected) {
    console.log('affected rows %d', affected)
    return res.status(200).json({status: 'success'})
  })
}

exports.details = function (req, res) {
  logger.serverLog(TAG,
              `Bot details are following ${JSON.stringify(req.body)}`)
  Bots
    .find({
      _id: req.body.botId
    }).populate('pageId').exec((err, bot) => {
      if (err) {
        return res.status(500).json({
          status: 'failed',
          description: `Internal Server Error ${JSON.stringify(err)}`
        })
      }
      logger.serverLog(TAG,
              `returning Bot details ${JSON.stringify(bot)}`)
      return res.status(200).json({status: 'success', payload: bot[0]})
    })
}

exports.delete = function (req, res) {
  logger.serverLog(TAG,
              `Deleting a bot ${JSON.stringify(req.body)}`)
  Bots.remove({
    _id: req.body.botId
  }, function (err, _) {
    if (err) return res.status(500).json({status: 'failed', payload: err})
    return res.status(200).json({status: 'success'})
  })
}
