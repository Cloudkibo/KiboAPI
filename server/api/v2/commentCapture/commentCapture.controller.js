const logger = require('../../../components/logger')
const needle = require('needle')
const TAG = 'api/commentCapture/commentCapture.controller.js'
const utility = require('../utility')
const logicLayer = require('./commentCapture.logiclayer')

exports.index = function (req, res) {
  utility.callApi(`companyUser/${req.user.domain_email}`)
  .then(companyUser => {
    utility.callApi(`commentCapture/${companyUser.companyId}`)
    .then(posts => {
      res.status(200).json({
        status: 'success',
        payload: posts
      })
    })
    .catch(error => {
      return res.status(500).json({
        status: 'failed',
        description: error
      })
    })
  })
  .catch(error => {
    return res.status(500).json({
      status: 'failed',
      description: error
    })
  })
}

exports.viewPost = function (req, res) {
  utility.callApi(`commentCapture/${req.params.id}`)
  .then(post => {
    res.status(200).json({
      status: 'success',
      payload: post
    })
  })
  .catch(error => {
    return res.status(500).json({
      status: 'failed',
      description: error
    })
  })
}

exports.create = function (req, res) {
  utility.callApi(`companyUser/${req.user.domain_email}`)
  .then(companyUser => {
    utility.callApi(`commentCapture`, 'post', {
      pageId: req.body.pageId,
      companyId: companyUser.companyId,
      user: req.user._id,
      reply: req.body.reply,
      payload: req.body.payload,
      includeKeywords: req.body.includeKeywords,
      excludedKeywords: req.body.excludedKeywords
    })
    .then(postCreated => {
      require('./../../../config/socketio').sendMessageToClient({
        room_id: companyUser.companyId,
        body: {
          action: 'post_created',
          payload: {
            poll_id: postCreated._id,
            user_id: req.user._id,
            user_name: req.user.name,
            company_id: companyUser.companyId
          }
        }
      })
      utility.callApi(`page/${req.body.pageId}`)
      .then(page => {
        let currentUser
        if (req.user.facebookInfo) {
          currentUser = req.user
        } else {
          currentUser = page.userId
        }
        needle.get(
        `https://graph.facebook.com/v2.10/${page.pageId}?fields=access_token&access_token=${currentUser.facebookInfo.fbToken}`,
        (err, resp) => {
          if (err) {
            logger.serverLog(TAG,
            `Page accesstoken from graph api Error${JSON.stringify(err)}`)
          }
          let messageData = logicLayer.setMessage(req.body.payload)
          if (messageData.image) {
            needle.post(
              `https://graph.facebook.com/${page.pageId}/photos?access_token=${resp.body.access_token}`,
              messageData, (err, resp) => {
                if (err) {
                  logger.serverLog(TAG, err)
                }
                let postId = resp.body.post_id ? resp.body.post_id : resp.body.id
                utility.callApi(`commentCapture/${postCreated._id}`, 'put', {post_id: postId})
                .then(result => {
                  res.status(201).json({status: 'success', payload: postCreated})
                })
                .catch(error => {
                  return res.status(500).json({
                    status: 'failed',
                    description: error
                  })
                })
              })
          } else if (messageData.video) {
            needle.post(
              `https://graph.facebook.com/${page.pageId}/videos?access_token=${resp.body.access_token}`,
              messageData, (err, resp) => {
                if (err) {
                  logger.serverLog(TAG, err)
                }
                let postId = resp.body.post_id ? resp.body.post_id : resp.body.id
                utility.callApi(`commentCapture/${postCreated._id}`, 'put', {post_id: postId})
                .then(result => {
                  res.status(201).json({status: 'success', payload: postCreated})
                })
                .catch(error => {
                  return res.status(500).json({
                    status: 'failed',
                    description: error
                  })
                })
              })
          } else {
            needle.post(
              `https://graph.facebook.com/${page.pageId}/feed?access_token=${resp.body.access_token}`,
              messageData, (err, resp) => {
                if (err) {
                  logger.serverLog(TAG, err)
                }
                let postId = resp.body.post_id ? resp.body.post_id : resp.body.id
                utility.callApi(`commentCapture/${postCreated._id}`, 'put', {post_id: postId})
                .then(result => {
                  res.status(201).json({status: 'success', payload: postCreated})
                })
                .catch(error => {
                  return res.status(500).json({
                    status: 'failed',
                    description: error
                  })
                })
              })
          }
        })
      })
      .catch(error => {
        return res.status(500).json({
          status: 'failed',
          description: error
        })
      })
    })
    .catch(error => {
      return res.status(500).json({
        status: 'failed',
        description: error
      })
    })
  })
  .catch(error => {
    return res.status(500).json({
      status: 'failed',
      description: error
    })
  })
}
exports.edit = function (req, res) {
  utility.callApi(`commentCapture/${req.body.postId}`, 'put', {includedKeywords: req.body.includedKeywords, excludedKeywords: req.body.excludedKeywords})
  .then(result => {
    res.status(201).json({status: 'success', payload: result})
  })
  .catch(error => {
    return res.status(500).json({
      status: 'failed',
      description: error
    })
  })
}
exports.delete = function (req, res) {
  utility.callApi(`commentCapture/${req.params.id}`, 'delete')
  .then(result => {
    res.status(201).json({status: 'success', payload: result})
  })
  .catch(error => {
    return res.status(500).json({
      status: 'failed',
      description: error
    })
  })
}
