const utility = require('../utility')
const logicLayer = require('./livechat/livechat.logiclayer')
const dataLayer = require('./livechat/livechat.datalayer')
let request = require('request')

exports.sendMessage = function (req, res) {
  if (!logicLayer.validateInput(req.body)) {
    return res.status(400)
      .send({status: 'failed', description: 'Please fill all the required fields'})
  }
  utility.callApi(`user/query`, 'post', {_id: req.consumer.consumerId.userId}, req.headers.consumer_id)
    .then(user => {
      utility.callApi(`pages/query`, 'post', {_id: req.body.pageId}, req.headers.consumer_id)
        .then(page => {
          page = page[0]
          utility.callApi(`subscribers/query`, 'post', {_id: req.body.subscriberId}, req.headers.consumer_id)
            .then(subscriber => {
              subscriber = subscriber[0]
              dataLayer.createForChat(logicLayer.prepareFbMessageObject(req.body, page.pageId, subscriber.senderId, req.consumer.consumerId.companyId, user))
                .then(message => {
                  sendMessage(req.body.payload, page, subscriber)
                    .then(result => {
                      return res.status(200)
                        .json({status: 'success',
                          payload: {
                            _id: message._id,
                            description: 'Message sent successfully!'
                          }
                        })
                    })
                    .catch(error => {
                      return res.status(500).send({status: 'failed', payload: `Failed to send chat ${JSON.stringify(error)}`})
                    })
                })
                .catch(error => {
                  return res.status(500).send({status: 'failed', payload: `Failed to create chat ${JSON.stringify(error)}`})
                })
            })
            .catch(error => {
              return res.status(500).send({status: 'failed', payload: `Failed to fetch subscriber ${JSON.stringify(error)}`})
            })
        })
        .catch(error => {
          return res.status(500).send({status: 'failed', payload: `Failed to fetch page ${JSON.stringify(error)}`})
        })
    })
    .catch(error => {
      return res.status(500).send({status: 'failed', payload: `Failed to fetch user ${JSON.stringify(error)}`})
    })
}
function sendMessage (payload, page, subscriber, refId) {
  return new Promise((resolve, reject) => {
    let messageData
    if (subscriber) {
      messageData = logicLayer.prepareSendAPIPayload(
        subscriber.senderId,
        payload,
        subscriber.firstName,
        subscriber.lastName
      )
    } else {
      messageData = logicLayer.prepareSendAPIPayloadForRef(refId, payload)
    }
    console.log('messageData in sendMessage', JSON.stringify(messageData))
    request(
      {
        'method': 'POST',
        'json': true,
        'formData': messageData,
        'uri': 'https://graph.facebook.com/v6.0/me/messages?access_token=' +
          page.accessToken
      },
      (err, res) => {
        console.log('response from fbb', JSON.stringify(res))
        if (err) {
          reject(err)
        } else if (res.statusCode !== 200) {
          reject(res.body)
        } else {
          resolve()
        }
      })
  })
}
exports.sendMessageUsingRefId = function (req, res) {
  if (!logicLayer.validateInput(req.body, true)) {
    return res.status(400)
      .send({status: 'failed', description: 'Please fill all the required fields'})
  }
  utility.callApi(`user/query`, 'post', {_id: req.consumer.consumerId.userId}, req.headers.consumer_id)
    .then(user => {
      utility.callApi(`pages/query`, 'post', {_id: req.body.pageId}, req.headers.consumer_id)
        .then(page => {
          page = page[0]
          sendMessage(req.body.payload, page, null, req.body.subscriberId)
            .then(result => {
              return res.status(200)
                .send({status: 'success',
                  payload: {
                    description: 'Message sent successfully!'
                  }
                })
            })
            .catch(error => {
              return res.status(500).send({status: 'failed', payload: `Failed to send chat ${JSON.stringify(error)}`})
            })
        })
        .catch(error => {
          return res.status(500).send({status: 'failed', payload: `Failed to fetch page ${JSON.stringify(error)}`})
        })
    })
    .catch(error => {
      return res.status(500).send({status: 'failed', payload: `Failed to fetch user ${JSON.stringify(error)}`})
    })
}
