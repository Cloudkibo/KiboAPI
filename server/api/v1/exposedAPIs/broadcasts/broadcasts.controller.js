const utility = require('../../utility')
const { validateInput, batchApi } = require('./utility')
const logicLayer = require('./broadcasts.logiclayer')
const dataLayer = require('./broadcasts.datalayer')
let request = require('request')

exports.sendBroadcast = function (req, res) {
  if (!validateInput(req.body)) {
    return res.status(400)
      .json({status: 'failed', description: 'Please fill all the required fields'})
  }
  dataLayer.createForBroadcast(logicLayer.prepareBroadCastPayload(req))
    .then(broadcast => {
      let subscriberFindCriteria = logicLayer.subsFindCriteria(req.body, req.consumer.consumerId.companyId)
      let interval = setInterval(() => {
        clearInterval(interval)
        sendToSubscribers(subscriberFindCriteria, req, res, broadcast)
      }, 3000)
    })
    .catch(error => {
      return res.status(500).json({status: 'failed', payload: `Failed to create broadcast ${JSON.stringify(error)}`})
    })
}
const sendToSubscribers = (subscriberFindCriteria, req, res, broadcast) => {
  utility.callApi(`subscribers/query`, 'post', subscriberFindCriteria, req.headers.consumer_id)
    .then(subscribers => {
      if (subscribers.length < 1) {
        return res.status(500).json({status: 'failed', description: `No subscribers match the selected criteria`})
      }
      utility.callApi(`pages/query`, 'post', {_id: req.body.pageId}, req.headers.consumer_id)
        .then(page => {
          page = page[0]
          subscribers.forEach((subscriber, index) => {
            // update broadcast sent field
            dataLayer.createForBroadcastPage({
              pageId: page.pageId,
              userId: req.consumer.consumerId.userId,
              subscriberId: subscriber.senderId,
              broadcastId: broadcast._id,
              seen: false,
              sent: false,
              companyId: req.consumer.consumerId.companyId
            })
              .then(savedpagebroadcast => {
                batchApi(req.body.payload, subscriber.senderId, page, sendBroadcast, subscriber.firstName, subscriber.lastName, res, index, subscribers.length, 'NON_PROMOTIONAL_SUBSCRIPTION')
              })
              .catch(error => {
                return res.status(500).json({status: 'failed', payload: `Failed to create page_broadcast ${JSON.stringify(error)}`})
              })
          })
        })
        .catch(error => {
          return res.status(500).json({status: 'failed', payload: `Failed to fetch page ${JSON.stringify(error)}`})
        })
    })
    .catch(error => {
      return res.status(500).json({status: 'failed', payload: `Failed to fetch subscribers ${JSON.stringify(error)}`})
    })
}
const sendBroadcast = (batchMessages, page, res, subscriberNumber, subscribersLength, testBroadcast) => {
  const r = request.post('https://graph.facebook.com', (err, httpResponse, body) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        description: `Failed to send broadcast ${JSON.stringify(err)}`
      })
    }
    console.log('response body', body)
    console.log('subscribersLength', subscribersLength)
    if (testBroadcast || (subscriberNumber === (subscribersLength - 1))) {
      return res.status(200)
        .json({status: 'success', description: 'Broadcast sent successfully!'})
    }
  })
  const form = r.form()
  form.append('access_token', page.accessToken)
  form.append('batch', batchMessages)
}
