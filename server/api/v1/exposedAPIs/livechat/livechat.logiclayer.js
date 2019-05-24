const _ = require('lodash')

exports.validateInput = (body) => {
  if (!_.has(body, 'payload')) return false
  if (!_.has(body, 'pageId')) return false
  if (!_.has(body, 'subscriberId')) return false

  if (body.payload.componentType === undefined || body.payload.componentType === '') return false

  if (body.payload.componentType === 'text') {
    if (body.payload.text === undefined ||
      body.payload.text === '') return false
  }

  if (body.payload.componentType === 'image' ||
    body.payload.componentType === 'video' ||
    body.payload.componentType === 'audio' ||
    body.payload.componentType === 'file') {
    if (body.payload.fileurl === undefined ||
        body.payload.fileurl === '') return false
  }

  if (body.payload.componentType !== 'image' ||
  body.payload.componentType !== 'video' ||
  body.payload.componentType !== 'audio' ||
  body.payload.componentType !== 'file' ||
  body.payload.componentType !== 'text') {
    return false
  }

  return true
}

exports.prepareFbMessageObject = (body, pageId, senderId, companyId, user) => {
  let fbMessageObject = {
    sender_id: body.pageId, // this is the page id: _id of Pageid
    recipient_id: body.subscriberId, // this is the subscriber id: _id of subscriberId
    sender_fb_id: pageId, // this is the (facebook) :page id of pageId
    recipient_fb_id: senderId, // this is the (facebook) subscriber id : pageid of subscriber id
    subscriber_id: body.subscriberId,
    company_id: companyId, // this is admin id till we have companies
    payload: body.payload, // this where message content will go
    status: 'unseen', // seen or unseen
    replied_by: {
      type: 'agent',
      id: user._id,
      name: user.name
    }
  }
  return fbMessageObject
}

exports.prepareSendAPIPayload = (subscriberId, body, fname, lname) => {
  let messageType = 'RESPONSE'
  let payload = {}
  let text = body.text
  if (body.componentType === 'text') {
    if (body.text.includes('{{user_full_name}}') || body.text.includes('[Username]')) {
      text = text.replace(
        '{{user_full_name}}', fname + ' ' + lname)
    }
    if (body.text.includes('{{user_first_name}}')) {
      text = text.replace(
        '{{user_first_name}}', fname)
    }
    if (body.text.includes('{{user_last_name}}')) {
      text = text.replace(
        '{{user_last_name}}', lname)
    }
    payload = {
      'messaging_type': messageType,
      'recipient': JSON.stringify({
        'id': subscriberId
      }),
      'message': JSON.stringify({
        'text': text,
        'metadata': 'SENT_FROM_KIBOPUSH'
      })
    }
    return payload
  } else if (['image', 'audio', 'file', 'video'].indexOf(
    body.componentType) > -1) {
    // let dir = path.resolve(__dirname, '../../../../broadcastFiles/userfiles')
    // let fileReaderStream
    // if (body.componentType === 'file') {
    //   fileReaderStream = fs.createReadStream(dir + '/' + body.fileurl.name)
    // } else {
    //   fileReaderStream = fs.createReadStream(dir + '/' + body.fileurl.id)
    // }

    payload = {
      'messaging_type': messageType,
      'recipient': JSON.stringify({
        'id': subscriberId
      }),
      'message': JSON.stringify({
        'attachment': {
          'type': body.componentType,
          'payload': {
            'url': body.fileurl,
            'is_reusable': true
          }
        }
      })
    }
    return payload
  }
  return payload
}
exports.prepareSendAPIPayloadForRef = (refId, body) => {
  let messageType = 'RESPONSE'
  let payload = {}
  let text = body.text
  if (body.componentType === 'text') {
    payload = {
      'messaging_type': messageType,
      'recipient': JSON.stringify({
        'user_ref': refId
      }),
      'message': JSON.stringify({
        'text': text,
        'metadata': 'SENT_FROM_KIBOPUSH'
      })
    }
    return payload
  } else if (['image', 'audio', 'file', 'video'].indexOf(
    body.componentType) > -1) {
    payload = {
      'messaging_type': messageType,
      'recipient': JSON.stringify({
        'user_ref': refId
      }),
      'message': JSON.stringify({
        'attachment': {
          'type': body.componentType,
          'payload': {
            'url': body.fileurl,
            'is_reusable': true
          }
        }
      })
    }
    return payload
  }
  return payload
}
