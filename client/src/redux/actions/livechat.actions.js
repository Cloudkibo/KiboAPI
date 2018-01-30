import * as ActionTypes from '../constants/constants'
import callApi from '../../utility/api.caller.service'
import auth from '../../utility/auth.service'
export const API_URL = '/api'
// import store from '../store/store'

export function showChatSessions (sessions, status) {
  console.log(sessions)
  console.log(status)
  var sorted = sessions.sort(function (a, b) {
    return new Date(b.last_activity_item) - new Date(a.last_activity_item)
  })
  console.log('sorted sessions', sorted)
  return {
    type: ActionTypes.SHOW_CHAT_SESSIONS,
    sorted
  }
}

export function updateChatSessions (session, sessions) {
  console.log(session)
  var temp = sessions
  for (var i = 0; i < temp.length; i++) {
    if (temp[i]._id === session._id) {
      temp[i] = session
    }
  }
  return {
    type: ActionTypes.UPDATE_CHAT_SESSIONS,
    sessions
  }
}

export function socketUpdate (data) {
  console.log(data.session_id)
  return {
    type: ActionTypes.SOCKET_UPDATE,
    data
  }
}

export function fetchSessions (companyid) {
  console.log('Fetching Chat Sessions')
  console.log(companyid)
  return (dispatch) => {
    callApi('sessions', 'post', companyid)
      .then(res => dispatch(showChatSessions(res.payload, res.status)))
  }
}

export function fetchSingleSession (sessionid, sessions) {
  console.log('Fetching single Chat Session', sessionid)
  return (dispatch) => {
    callApi(`sessions/${sessionid}`)
      .then(res => dispatch(updateChatSessions(res.payload, sessions)))
  }
}

export function showUserChats (userChat) {
  console.log(userChat)
  return {
    type: ActionTypes.SHOW_USER_CHAT,
    userChat
  }
}

export function resetSocket () {
  return {
    type: ActionTypes.RESET_SOCKET
  }
}

export function resetUnreadSession () {
  return {
    type: ActionTypes.RESET_UNREAD_SESSION
  }
}

export function fetchUserChats (sessionid) {
  console.log('Fetching User Chats')
  return (dispatch) => {
    callApi(`livechat/${sessionid}`)
      .then(res => dispatch(showUserChats(res.payload)))
  }
}

export function getSession (data) {
  // here we will fetch list of subscribers from endpoint
  data = {

  }
  console.log('Sending Chat to Server')
  return (dispatch) => {
    // callApi('sessions')
    //   .then(res => dispatch(updateDashboard(res.payload)))
  //  dispatch(updateSession(data))
  }
}

export function uploadAttachment (fileData, handleUpload) {
  console.log('In Live Action', fileData)
  return (dispatch) => {
    console.log('In dispatch', fileData)
    // eslint-disable-next-line no-undef
    fetch(`${API_URL}/broadcasts/upload`, {
      method: 'post',
      body: fileData,
      // eslint-disable-next-line no-undef
      headers: new Headers({
        'Authorization': `Bearer ${auth.getToken()}`
      })
    }).then((res) => res.json()).then((res) => res).then(res => {
      console.log('respone', res)
      handleUpload(res)
    })
  }
}

export function deletefile (data, handleRemove) {
  return (dispatch) => {
    callApi(`broadcasts/delete/${data}`)
      .then(res => {
        console.log('delete file', res)
        handleRemove(res)
      })
  }
}

export function sendAttachment (data, handleSendAttachment) {
  console.log('Sending attachment on Live Chat', data)
  return (dispatch) => {
    callApi('livechat/', 'post', data).then(res => {
      console.log('Send Attachment Response', res)
      handleSendAttachment(res)
    })
  }
}

export function sendChatMessage (data) {
  console.log('Sending chat message on Live Chat', data)
  return (dispatch) => {
    callApi('livechat/', 'post', data).then(res => {
      console.log('Send Attachment Response', res)
    })
  }
}

export function loadingUrlMeta (url) {
  return {
    type: ActionTypes.LOADING_URL_META,
    urlValue: url,
    loadingUrl: true
  }
}

export function urlMetaReceived (meta) {
  return {
    type: ActionTypes.GET_URL_META,
    urlMeta: meta,
    loadingUrl: false
  }
}

export function fetchUrlMeta (url) {
  console.log('Fetching url meta', url)
  return (dispatch) => {
    dispatch(loadingUrlMeta(url))
    callApi('livechat/geturlmeta', 'post', {url: url}).then(res => {
      console.log('Fetch Url Meta Response', res)
      if (res.status === 'success') {
        dispatch(urlMetaReceived(res.payload))
      } else {
        dispatch(urlMetaReceived({}))
      }
    })
  }
}

export function markRead (sessionid, sessions) {
  console.log('Mark unread messages as read', sessionid)
  return (dispatch) => {
    callApi(`sessions/markread/${sessionid}`).then(res => {
      console.log('Mark as read Response', res)
    })
  }
}
