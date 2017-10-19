import * as ActionTypes from '../constants/constants'
import callApi from '../../utility/api.caller.service'
import auth from '../../utility/auth.service'
export const API_URL = '/api'

export function showChatSessions (sessions, status) {
  console.log(sessions)
  console.log(status)
  return {
    type: ActionTypes.SHOW_CHAT_SESSIONS,
    sessions
  }
}

export function socketUpdate (data) {
  console.log(data)
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

export function showUserChats (userChat) {
  console.log(userChat)
  return {
    type: ActionTypes.SHOW_USER_CHAT,
    userChat
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