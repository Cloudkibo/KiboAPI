/**
 * Created by sojharo on 23/10/2017.
 */

const config = require('../environment/index')
let Twit = require('twit')
let AutoPosting = require('../../api/autoposting/autopostings.model')
let Pages = require('../../api/pages/Pages.model')
let Subscribers = require('../../api/subscribers/Subscribers.model')
let request = require('request')
let _ = require('lodash')

const logger = require('../../components/logger')
const TAG = 'config/integrations/twitter.js'

// test twitter ids : [2616186000, 1430793200]

let twitterClient = new Twit({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token: config.twitter.consumer_token,
  access_token_secret: config.twitter.consumer_token_secret
})

let stream

function connect () {
  AutoPosting.find({subscriptionType: 'twitter', isActive: true},
    (err, autoposting) => {
      if (err) {
        return logger.serverLog(TAG, 'Internal Server Error on connect')
      }
      if (autoposting) {
        let arrUsers = []
        for (let i = 0; i < autoposting.length; i++) {
          arrUsers.push(autoposting[i].payload.id)
        }
        logger.serverLog(TAG, `Twitter Ids to listen: ${arrUsers}`)
        stream = twitterClient.stream('statuses/filter',
          {follow: arrUsers})

        stream.on('tweet', tweet => {
          logger.serverLog(TAG, `Tweet received : ${tweet.text}`)
          AutoPosting.find({accountUniqueName: tweet.user.screen_name})
            .populate('userId')
            .exec((err, autopostings) => {
              if (err) {
                return logger.serverLog(TAG, 'Internal Server Error on connect')
              }
              logger.serverLog(TAG,
                `Autoposting records got for tweet : ${autopostings.length}`)
              autopostings.forEach(postingItem => {
                let pagesFindCriteria = {
                  userId: postingItem.userId._id,
                  connected: true
                }

                if (postingItem.isSegmented) {
                  if (postingItem.segmentationPageIds) {
                    pagesFindCriteria = _.merge(pagesFindCriteria, {
                      pageId: {
                        $in: postingItem.segmentationPageIds
                      }
                    })
                  }
                }
                Pages.find(pagesFindCriteria, (err, pages) => {
                  if (err) {
                    logger.serverLog(TAG, `Error ${JSON.stringify(err)}`)
                  }
                  logger.serverLog(TAG,
                    `Pages records got for tweet : ${pages.length}`)
                  pages.forEach(page => {
                    logger.serverLog(TAG,
                      `Page in the loop for tweet ${page.pageName}`)

                    let subscriberFindCriteria = {
                      pageId: page._id,
                      isSubscribed: true
                    }

                    if (postingItem.isSegmented) {
                      if (postingItem.segmentationGender.length > 0) {
                        subscriberFindCriteria = _.merge(subscriberFindCriteria,
                          {
                            gender: {
                              $in: postingItem.segmentationGender
                            }
                          })
                      }
                      if (postingItem.segmentationLocale.length > 0) {
                        subscriberFindCriteria = _.merge(subscriberFindCriteria,
                          {
                            locale: {
                              $in: postingItem.segmentationLocale
                            }
                          })
                      }
                    }

                    logger.serverLog(TAG,
                      `Subscribers Criteria for segmentation ${JSON.stringify(
                        subscriberFindCriteria)}`)
                    Subscribers.find(subscriberFindCriteria,
                      (err, subscribers) => {
                        if (err) {
                          return logger.serverLog(TAG,
                            `Error ${JSON.stringify(err)}`)
                        }

                        logger.serverLog(TAG,
                          `Total Subscribers of page ${page.pageName} are ${subscribers.length}`)

                        subscribers.forEach(subscriber => {
                          let messageData = {
                            'recipient': JSON.stringify({
                              'id': subscriber.senderId
                            }),
                            'message': JSON.stringify({
                              'text': tweet.text,
                              'metadata': 'This is a meta data for tweet'
                            })
                          }
                          request(
                            {
                              'method': 'POST',
                              'json': true,
                              'formData': messageData,
                              'uri': 'https://graph.facebook.com/v2.6/me/messages?access_token=' +
                              page.accessToken
                            },
                            function (err, res) {
                              if (err) {
                                return logger.serverLog(TAG,
                                  `At send tweet broadcast ${JSON.stringify(
                                    err)}`)
                              } else {
                                if (res.statusCode !== 200) {
                                  logger.serverLog(TAG,
                                    `At send tweet broadcast response ${JSON.stringify(
                                      res.body.error)}`)
                                } else {
                                  logger.serverLog(TAG,
                                    `At send tweet broadcast response ${JSON.stringify(
                                      res.body.message_id)}`)
                                }
                              }
                            })
                        })
                      })
                  })
                })
              })
            })
        })
      }
    })
}

function restart () {
  stream.stop()
  connect()
}

function findUser (screenName, fn) {
  twitterClient.get('users/show', {screen_name: screenName},
    (err, data, response) => {
      if (err) {
        fn(err)
      }
      if (data.errors) {
        if (data.errors[0].code === 50) {
          fn('User not found on Twitter')
        }
      }
      fn(null, data)
    })
}

exports.connect = connect
exports.findUser = findUser
exports.restart = restart