import * as ActionTypes from '../constants/constants'
import callApi from '../../utility/api.caller.service'
import auth from '../../utility/auth.service'
export const API_URL = '/api'

export function showAllPosts (data) {
  console.log('Data Fetched From posts', data)
  return {
    type: ActionTypes.SHOW_FACEBOOK_POSTS,
    data: data.reverse()
  }
}
export function saveCurrentPost (data) {
  console.log('Actions for saving currentPost')
  return {
    type: ActionTypes.CURRENT_POST,
    data
  }
}

export function fetchAllPosts () {
  console.log('Actions for loading all facebook Posts')
  return (dispatch) => {
    callApi('post').then(res => {
      if (res.status === 'success' && res.payload) {
        dispatch(showAllPosts(res.payload))
      } else {
        console.log('Error in loading Posts', res)
      }
    })
  }
}
export function deletePost (id, msg) {
  console.log('Actions for deleting facebook Post')
  return (dispatch) => {
    callApi(`post/delete/${id}`, 'delete').then(res => {
      if (res.status === 'success') {
        msg.success('Post has been deleted')
        dispatch(fetchAllPosts(res.payload))
      } else {
        msg.error('Error in deleting post')
      }
    })
  }
}
export function createFacebookPost (data, msg, handleCreate) {
  console.log('data', data)
  return (dispatch) => {
    callApi('post/create', 'post', data)
      .then(res => {
        console.log('response from server', res)
        if (res.status === 'success' && res.payload) {
          msg.success('Posted on Facebook successfully')
          handleCreate()
        } else {
          if (res.status === 'failed' && res.description) {
            msg.error(`Failed to post on facebook. ${res.description}`)
          } else {
            msg.error('Failed to post on facebook')
          }
        }
      })
  }
}
export function editFacebookPost (data, msg) {
  console.log('edit Facebook Post', data)
  return (dispatch) => {
    callApi('post/edit', 'post', data)
      .then(res => {
        console.log('response from server', res)
        if (res.status === 'success') {
          msg.success('Changes saved successfully')
        } else {
          if (res.status === 'failed' && res.description) {
            msg.error(`Failed to save changes. ${res.description}`)
          } else {
            msg.error('Failed to save changes')
          }
        }
      })
  }
}
export function uploadAttachment (fileData, handleUpload) {
  return (dispatch) => {
    // eslint-disable-next-line no-undef
    fetch(`${API_URL}/broadcasts/upload`, {
      method: 'post',
      body: fileData,
      // eslint-disable-next-line no-undef
      headers: new Headers({
        'Authorization': `Bearer ${auth.getToken()}`
      })
    }).then((res) => res.json()).then((res) => res).then(res => {
      console.log('response', res)
      handleUpload(res, fileData)
    })
  }
}