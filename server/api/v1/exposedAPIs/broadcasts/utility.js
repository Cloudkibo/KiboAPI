const _ = require('lodash')

exports.validateInput = (body) => {
  if (!_.has(body, 'payload')) return false
  if (!_.has(body, 'title')) return false
  if (!_.has(body, 'pageId')) return false

  if (body.payload.length === 0) {
    return false
  } else {
    for (let i = 0; i < body.payload.length; i++) {
      if (body.payload[i].componentType === undefined || body.payload[i].componentType === '') return false

      if (body.payload[i].componentType !== 'text' &&
      body.payload[i].componentType !== 'image' &&
      body.payload[i].componentType !== 'video' &&
      body.payload[i].componentType !== 'audio' &&
      body.payload[i].componentType !== 'file' &&
      body.payload[i].componentType !== 'card' &&
      body.payload[i].componentType !== 'media' &&
      body.payload[i].componentType !== 'gallery' &&
      body.payload[i].componentType !== 'list') return false

      if (body.payload[i].componentType === 'text') {
        if (body.payload[i].text === undefined ||
          body.payload[i].text === '') return false
        if (body.payload[i].buttons) {
          for (let j = 0; j < body.payload[i].buttons.length; j++) {
            if (body.payload[i].buttons[j].type === 'web_url') {
              if (!validateUrl(
                body.payload[i].buttons[j].url)) return false
            }
          }
        }
      }
      if (body.payload[i].componentType === 'image' ||
        body.payload[i].componentType === 'video' ||
        body.payload[i].componentType === 'audio' ||
        body.payload[i].componentType === 'file') {
        if (body.payload[i].fileurl === undefined ||
            body.payload[i].fileurl === '') return false
      }

      if (body.payload[i].componentType === 'card') {
        if (body.payload[i].title === undefined ||
          body.payload[i].title === '') return false
        if (body.payload[i].fileurl === undefined ||
          body.payload[i].fileurl === '') return false
        if (body.payload[i].subtitle === undefined ||
          body.payload[i].subtitle === '') return false
        if (body.payload[i].buttons === undefined) return false
        if (body.payload[i].buttons.length === 0) return false
        if (!validateUrl(body.payload[i].fileurl)) return false
        for (let j = 0; j < body.payload[i].buttons.length; j++) {
          if (body.payload[i].buttons[j].type === 'web_url') {
            if (!validateUrl(
              body.payload[i].buttons[j].url)) return false
          }
        }
      }
      if (body.payload[i].componentType === 'media') {
        if (body.payload[i].fileurl === undefined ||
          body.payload[i].fileurl === '') return false
        if (body.payload[i].mediaType === undefined ||
          body.payload[i].mediaType === '') return false
        if (body.payload[i].mediaType !== 'video' &&
          body.payload[i].mediaType !== 'image') return false
        for (let j = 0; j < body.payload[i].buttons.length; j++) {
          if (body.payload[i].buttons[j].type === 'web_url') {
            if (!validateUrl(
              body.payload[i].buttons[j].url)) return false
          }
        }
      }
      if (body.payload[i].componentType === 'gallery') {
        if (body.payload[i].cards === undefined) return false
        if (body.payload[i].cards.length === 0) return false
        for (let j = 0; j < body.payload[i].cards.length; j++) {
          if (body.payload[i].cards[j].title === undefined ||
            body.payload[i].cards[j].title === '') return false
          if (body.payload[i].cards[j].fileurl === undefined ||
            body.payload[i].cards[j].fileurl === '') return false
          if (body.payload[i].cards[j].subtitle === undefined ||
            body.payload[i].cards[j].subtitle === '') return false
          if (body.payload[i].cards[j].buttons === undefined) return false
          if (body.payload[i].cards[j].buttons.length === 0) return false
          if (!validateUrl(
            body.payload[i].cards[j].fileurl)) return false
          for (let k = 0; k < body.payload[i].cards[j].buttons.length; k++) {
            if (body.payload[i].cards[j].buttons[k].type === 'web_url') {
              if (!validateUrl(
                body.payload[i].cards[j].buttons[k].url)) return false
            }
          }
        }
      }
      if (body.payload[i].componentType === 'list') {
        if (body.payload[i].listItems === undefined) return false
        if (body.payload[i].listItems.length === 0) return false
        if (body.payload[i].topElementStyle === undefined ||
        body.payload[i].topElementStyle === '') return false
        if (body.payload[i].topElementStyle !== 'compact' &&
        body.payload[i].topElementStyle !== 'large') return false
        if (body.payload[i].buttons) {
          for (let m = 0; m < body.payload[i].buttons.length; m++) {
            if (body.payload[i].buttons[m].type === undefined ||
            body.payload[i].buttons[m].type === '') return false
            if (body.payload[i].buttons[m].type !== 'element_share' && (body.payload[i].buttons[m].title === undefined ||
            body.payload[i].buttons[m].title === '')) return false
            if (body.payload[i].buttons[m].type === 'web_url') {
              if (!validateUrl(
                body.payload[i].buttons[m].url)) return false
            }
          }
        }
        for (let j = 0; j < body.payload[i].listItems.length; j++) {
          if (body.payload[i].listItems[j].title === undefined ||
            body.payload[i].listItems[j].title === '') return false
          if (body.payload[i].listItems[j].subtitle === undefined ||
            body.payload[i].listItems[j].subtitle === '') return false
          if (body.payload[i].listItems[j].default_action && (
            body.payload[i].listItems[j].default_action.type === undefined ||
            body.payload[i].listItems[j].default_action.type === '')) return false
          if (body.payload[i].listItems[j].default_action && (
            body.payload[i].listItems[j].default_action.url === undefined ||
            body.payload[i].listItems[j].default_action.url === '')) return false
          if (body.payload[i].listItems[j].fileurl && !validateUrl(
            body.payload[i].listItems[j].fileurl)) return false
          if (body.payload[i].listItems[j].buttons) {
            for (let k = 0; k < body.payload[i].listItems[j].buttons.length; k++) {
              if (body.payload[i].listItems[j].buttons[k].type !== 'element_share' && (body.payload[i].listItems[j].buttons[k].title === undefined ||
              body.payload[i].listItems[j].buttons[k].title === '')) return false
              if (body.payload[i].listItems[j].buttons[k].type === undefined ||
              body.payload[i].listItems[j].buttons[k].type === '') return false
              if (body.payload[i].listItems[j].buttons[k].type === 'web_url') {
                if (!validateUrl(
                  body.payload[i].listItems[j].buttons[k].url)) return false
              }
            }
          }
        }
      }
    }
  }

  return true
}

function validateUrl (str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
  if (regexp.test(str)) {
    return true
  } else {
    return false
  }
}
/* eslint-disable */
exports.batchApi = (payload, recipientId, page, sendBroadcast, fname, lname, res, subscriberNumber, subscribersLength, fbMessageTag, broadcastId ) => {
  let recipient = "recipient=" + encodeURIComponent(JSON.stringify({"id": recipientId}))
  let tag = "tag=" + encodeURIComponent(fbMessageTag)
  let messagingType = "messaging_type=" + encodeURIComponent("MESSAGE_TAG")
  let batch = []
  payload.forEach((item, index) => {
    let message = "message=" + encodeURIComponent(prepareMessageData(item, fname, lname))
    if (index === 0) {
      batch.push({ "method": "POST", "name": `message${index + 1}`, "relative_url": "v2.6/me/messages", "body": recipient + "&" + message + "&" + messagingType +  "&" + tag})
    } else {
      batch.push({ "method": "POST", "name": `message${index + 1}`, "depends_on": `message${index}`, "relative_url": "v2.6/me/messages", "body": recipient + "&" + message + "&" + messagingType +  "&" + tag})
    }
    if (index === (payload.length - 1)) {
      sendBroadcast(JSON.stringify(batch), page, res, subscriberNumber, subscribersLength, broadcastId)
    }
  })
}
/* eslint-disable */

function prepareMessageData (body, fname, lname) {
  let payload = {}
  let text = body.text
  if (body.componentType === 'text' && !body.buttons) {
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
      'text': text
    }
    return JSON.stringify(payload)
  } else if (body.componentType === 'text' && body.buttons) {
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
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'button',
          'text': text,
          'buttons': body.buttons
        }
      }
    }
  } else if (['image', 'audio', 'file', 'video'].indexOf(
    body.componentType) > -1) {
    payload = {
      'attachment': {
        'type': body.componentType,
        'payload': {
          'attachment_id': body.attachment_id
        }
      }
    }
    return JSON.stringify(payload)
    // todo test this one. we are not removing as we need to keep it for live chat
    // if (!isForLiveChat) deleteFile(body.fileurl)
  } else if (['gif', 'sticker', 'thumbsUp'].indexOf(
    body.componentType) > -1) {
    payload = {
      'attachment': {
        'type': 'image',
        'payload': {
          'url': body.fileurl
        }
      }
    }
  } else if (body.componentType === 'card') {
    if (body.default_action) {
      payload = {
        'attachment': {
          'type': 'template',
          'payload': {
            'template_type': 'generic',
            'elements': [
              {
                'title': body.title,
                'image_url': body.fileurl,
                'subtitle': body.subtitle,
                'buttons': body.buttons,
                'default_action': body.default_action
              }
            ]
          }
        }
      }
    } else {
      payload = {
        'attachment': {
          'type': 'template',
          'payload': {
            'template_type': 'generic',
            'elements': [
              {
                'title': body.title,
                'image_url': body.fileurl,
                'subtitle': body.subtitle,
                'buttons': body.buttons
              }
            ]
          }
        }
      }
    }
  } else if (body.componentType === 'gallery') {
    var galleryCards = []
    if (body.cards && body.cards.length > 0) {
      for (var g = 0; g < body.cards.length; g++) {
        var card = body.cards[g]
        var galleryCard = {}
        galleryCard.image_url = card.fileurl
        galleryCard.title = card.title
        galleryCard.buttons = card.buttons
        galleryCard.subtitle = card.subtitle
        if (card.default_action) {
          galleryCard.default_action = card.default_action
        }
        galleryCards.push(galleryCard)
      }
    }
    payload = {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'generic',
          'elements': galleryCards
        }
      }
    }
  } else if (body.componentType === 'list') {
    payload = {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'list',
          'top_element_style': body.topElementStyle,
          'elements': body.listItems,
          'buttons': body.buttons
        }
      }
    }
  } else if (body.componentType === 'media') {
    payload = {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'media',
          'elements': [
            {
              'attachment_id': body.attachment_id,
              'media_type': body.mediaType,
              'buttons': body.buttons
            }
          ]
        }
      }
    }
  }
  return JSON.stringify(payload)
}
