const utility = require('../../utility')
const { validateInput, batchApi } = require('./utility')
const logicLayer = require('./broadcasts.logiclayer')
const dataLayer = require('./broadcasts.datalayer')
let request = require('request')
const needle = require('needle')
const path = require('path')
const fs = require('fs')
let config = require('./../../../../config/environment')

exports.sendBroadcast = function (req, res) {
  if (!validateInput(req.body)) {
    return res.status(400)
      .json({status: 'failed', description: 'Please fill all the required fields'})
  }
  utility.callApi(`pages/query`, 'post', {_id: req.body.pageId}, req.headers.consumer_id)
    .then(page => {
      page = page[0]
      updatePayload(req.body, page)
        .then(result => {
          console.log('updatedPayload result', JSON.stringify(result.payload))
          dataLayer.createForBroadcast(logicLayer.prepareBroadCastPayload(req, result.payload))
            .then(broadcast => {
              let subscriberFindCriteria = logicLayer.subsFindCriteria(req.body, req.consumer.consumerId.companyId)
              console.log('subsFindCriteria', subscriberFindCriteria)
              let interval = setInterval(() => {
                clearInterval(interval)
                sendToSubscribers(subscriberFindCriteria, req, res, broadcast, page, result.payload)
              }, 3000)
            })
            .catch(error => {
              return res.status(500).json({status: 'failed', payload: `Failed to create broadcast ${JSON.stringify(error)}`})
            })
        })
        .catch(error => {
          console.log('in updatedPayload catch', error)
          return res.status(500).json({status: 'failed', payload: `Failed to upload attachment on facebook ${JSON.stringify(error)}`})
        })
    })
    .catch(error => {
      return res.status(500).json({status: 'failed', payload: `Failed to fetch page ${JSON.stringify(error)}`})
    })
}
const sendToSubscribers = (subscriberFindCriteria, req, res, broadcast, page, payload) => {
  utility.callApi(`subscribers/query`, 'post', subscriberFindCriteria, req.headers.consumer_id)
    .then(subscribers => {
      if (subscribers.length < 1) {
        return res.status(500).json({status: 'failed', description: `No subscribers match the selected criteria`})
      }
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
            batchApi(payload, subscriber.senderId, page, sendBroadcast, subscriber.firstName, subscriber.lastName, res, index, subscribers.length, 'NON_PROMOTIONAL_SUBSCRIPTION', broadcast._id)
          })
          .catch(error => {
            return res.status(500).json({status: 'failed', payload: `Failed to create page_broadcast ${JSON.stringify(error)}`})
          })
      })
    })
    .catch(error => {
      return res.status(500).json({status: 'failed', payload: `Failed to fetch subscribers ${JSON.stringify(error)}`})
    })
}
const sendBroadcast = (batchMessages, page, res, subscriberNumber, subscribersLength, broadcastId) => {
  const r = request.post('https://graph.facebook.com', (err, httpResponse, body) => {
    console.log('response body', body)
    console.log('subscribersLength', subscribersLength)
    if (err) {
      return res.status(500).json({
        status: 'failed',
        description: `Failed to send broadcast ${JSON.stringify(err)}`
      })
    } else if ((body[0] && body[0].code !== 200)) {
      return res.status(500).json({
        status: 'failed',
        description: `Failed to send broadcast ${JSON.stringify(body)}`
      })
    } else {
      if ((subscriberNumber === (subscribersLength - 1))) {
        return res.status(200)
          .json({status: 'success',
            payload: {
              _id: broadcastId,
              description: 'Broadcast sent successfully!'
            }
          })
      }
    }
  })
  const form = r.form()
  form.append('access_token', page.accessToken)
  form.append('batch', batchMessages)
}

function updatePayload (body, page) {
  return new Promise((resolve, reject) => {
    console.log('in updatePayload', body.payload)
    let url = ''
    let payload = body.payload
    for (let i = 0; i < payload.length; i++) {
      if (payload[i].componentType.toLowerCase() !== 'text') {
        // url = uploadFileOnServer(payload[i], page)
        // console.log('url uploaded', url)
        uploadFileOnFaceBook(payload[i], page, url)
          .then(result => {
            payload[i] = result
            if (i === payload.length - 1) {
              console.log('resolve payload', payload)
              resolve({payload: payload})
            }
          })
          .catch((err) => {
            reject(err)
          })
      } else {
        if (i === payload.length - 1) {
          console.log('resolve payload', payload)
          resolve({payload: payload})
        }
      }
    }
  })
}
function uploadFileOnFaceBook (payload, page) {
  return new Promise((resolve, reject) => {
    let updatedPayload = payload
    needle.get(
      `https://graph.facebook.com/v2.10/${page.pageId}?fields=access_token&access_token=${page.userId.facebookInfo.fbToken}`,
      (err, resp2) => {
        if (err) {
          console.log('error in fetching page access_token', JSON.stringify(err))
        }
        let pageAccessToken = resp2.body.access_token
        // let fileReaderStream = fs.createReadStream(payload.fileurl)
        const messageData = {
          'message': JSON.stringify({
            'attachment': {
              'type': payload.componentType.toLowerCase(),
              'payload': {
                'is_reusable': true,
                'url': payload.fileurl
              }
            }
          })
        }
        request(
          {
            'method': 'POST',
            'json': true,
            'formData': messageData,
            'uri': 'https://graph.facebook.com/v2.6/me/message_attachments?access_token=' + pageAccessToken
          },
          function (err, resp) {
            console.log('response from uploading attachment', JSON.stringify(resp.body))
            if (err) {
              console.log('error in uploading attachment on facebook', JSON.stringify(err))
              reject(err)
            } else if (resp.statusCode !== 200) {
              reject(resp)
            } else {
              updatedPayload.attachment_id = resp.body.attachment_id
              resolve(updatedPayload)
            }
          })
      })
  })
}
function uploadFileOnServer (payload, page) {
  // var today = new Date()
  // var uid = crypto.randomBytes(5).toString('hex')
  // var serverPath = 'f' + uid + '' + today.getFullYear() + '' +
  //   (today.getMonth() + 1) + '' + today.getDate()
  // serverPath += '' + today.getHours() + '' + today.getMinutes() + '' +
  //   today.getSeconds()
  // let fext = req.files.file.name.split('.')
  // serverPath += '.' + fext[fext.length - 1].toLowerCase()
  //
  let dir = path.resolve(__dirname, '../../../../../broadcastFiles/')
  console.log('dir', dir)
  //
  // logger.serverLog(TAG,
  //   `req.files.file ${JSON.stringify(req.files.file.path)}`)
  // logger.serverLog(TAG,
  //   `req.files.file ${JSON.stringify(req.files.file.name)}`)
  // logger.serverLog(TAG,
  //   `dir ${JSON.stringify(dir)}`)
  // logger.serverLog(TAG,
  //   `serverPath ${JSON.stringify(serverPath)}`)
  // let readData = fs.createReadStream(dir + '/userfiles/')
  let fileToStore = dir + '/userfiles/' + payload.fileurl
  var stream = request(payload.fileurl).pipe(fs.createWriteStream(fileToStore))
  stream.on('finish', function () {
    console.log('finished')
    // let writeData = fs.createWriteStream(dir + '/userfiles/' + payload.fileurl)
    //   readData.pipe(writeData)
    return `${dir}/userfiles/${payload.fileurl}`
  })
}
