const utility = require('../../utility')
const logicLayer = require('./livechat.logiclayer')
const dataLayer = require('./livechat.datalayer')
let request = require('request')

exports.sendMessage = function (req, res) {
  if (!logicLayer.validateInput(req.body)) {
    return res.status(400)
      .json({status: 'failed', description: 'Please fill all the required fields'})
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
                      console.log('result at the end then', result)
                      return res.status(200)
                        .json({status: 'success',
                          payload: {
                            _id: message._id,
                            description: 'Message sent successfully!'
                          }
                        })
                    })
                    .catch(error => {
                      console.log('result at the end in catch', error)
                      return res.status(500).json({status: 'failed', payload: `Failed to send chat ${JSON.stringify(error)}`})
                    })
                })
                .catch(error => {
                  return res.status(500).json({status: 'failed', payload: `Failed to create chat ${JSON.stringify(error)}`})
                })
            })
            .catch(error => {
              return res.status(500).json({status: 'failed', payload: `Failed to fetch subscriber ${JSON.stringify(error)}`})
            })
        })
        .catch(error => {
          return res.status(500).json({status: 'failed', payload: `Failed to fetch page ${JSON.stringify(error)}`})
        })
    })
    .catch(error => {
      return res.status(500).json({status: 'failed', payload: `Failed to fetch user ${JSON.stringify(error)}`})
    })
}
function sendMessage (payload, page, subscriber) {
  return new Promise((resolve, reject) => {
    let messageData = logicLayer.prepareSendAPIPayload(
      subscriber.senderId,
      payload,
      subscriber.firstName,
      subscriber.lastName
    )
    console.log('messageData in sendMessage', JSON.stringify(messageData))
    request(
      {
        'method': 'POST',
        'json': true,
        'formData': messageData,
        'uri': 'https://graph.facebook.com/v2.6/me/messages?access_token=' +
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
