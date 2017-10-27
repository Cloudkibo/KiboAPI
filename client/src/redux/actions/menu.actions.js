import * as ActionTypes from '../constants/constants'
import callApi from '../../utility/api.caller.service'

export function createMenuItem (data) {
  return {
    type: ActionTypes.ADD_MENU_ITEM,
    data
  }
}
export function addMenuItem (data) {
  console.log('in addMenuItem', data)
  return (dispatch) => {
    callApi('menu/createWebLink', 'post', data)
      .then(res => dispatch(createMenuItem(res.payload)))
  }
}
export function sendMessageSuccess () {
  return {
    type: ActionTypes.SEND_MESSAGE_SUCCESS
  }
}

export function sendMessageFailure () {
  return {
    type: ActionTypes.SEND_MESSAGE_FAILURE
  }
}

export function SendMessage (message) {
  console.log('Sending message', message)
  return (dispatch) => {
    callApi('menu/createReplyMenu', 'post', message).then(res => {
      if (res.status === 'success') {
        dispatch(sendMessageSuccess())
      } else {
        dispatch(sendMessageFailure())
      }
      console.log('Send Message Response', res)
    })
  }
}
