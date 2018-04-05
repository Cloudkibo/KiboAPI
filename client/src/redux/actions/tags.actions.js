import * as ActionTypes from '../constants/constants'
import callApi from '../../utility/api.caller.service'

export function updateTagsList (data) {
  console.log('Data Fetched From Tags', data)
  return {
    type: ActionTypes.LOAD_TAGS_LIST,
    data
  }
}
export function loadSubscriberTags (data) {
  console.log('Subscriber Tags', data)
  return {
    type: ActionTypes.LOAD_SUBSCRIBER_TAGS,
    data
  }
}
export function loadTags () {
  console.log('Actions for loading subscriber Tags')
  return (dispatch) => {
    callApi('tags').then(res => {
      if (res.status === 'success' && res.payload) {
        dispatch(updateTagsList(res.payload))
      } else {
        console.log('Error in loading Tags', res)
      }
    })
  }
}
export function assignTags (data, handleResponse, msg) {
  console.log('Actions for saving subscriber Tags', data)
  return (dispatch) => {
    callApi('tags/assign', 'post', data)
    .then(res => {
      if (res.status === 'success') {
        msg.success(`${res.description}`)
      } else {
        if (res.status === 'failed' && res.description) {
          msg.error(`Unable to assign tags. ${res.description}`)
        } else {
          msg.error('Unable to assign tags')
        }
      }
      handleResponse()
    })
  }
}
export function unassignTags (data, handleResponse, msg) {
  console.log('Actions for saving subscriber Tags', data)
  return (dispatch) => {
    callApi('tags/unassign', 'post', data)
    .then(res => {
      if (res.status === 'success') {
        msg.success(`${res.description}`)
      } else {
        if (res.status === 'failed' && res.description) {
          msg.error(`Unable to unassign tags. ${res.description}`)
        } else {
          msg.error('Unable to unassign tags')
        }
      }
      handleResponse()
    })
  }
}
export function createTag (tag, handleResponse, msg) {
  console.log('Actions for saving new subscriber Tag', tag)
  return (dispatch) => {
    callApi('tags', 'post', {tag: tag})
      .then(res => {
        if (res.status === 'success' && res.payload) {
          dispatch(loadTags())
          msg.success('New Tag Created')
        } else {
          msg.error('Error in Creating Tag')
        }
        handleResponse()
      })
  }
}
export function getSubscriberTags (id, msg) {
  console.log('Actions for getting subscriber Tag', id)
  return (dispatch) => {
    callApi('tags/subscribertags/', 'post', {subscriberId: id})
      .then(res => {
        if (res.status === 'success' && res.payload) {
          dispatch(loadSubscriberTags(res.payload))
        } else {
          if (msg) {
            msg.error('Error in getting subscriber tags')
          }
        }
      })
  }
}
export function deleteTag (id, msg) {
  console.log('Actions for deleteing Tag', id)
  return (dispatch) => {
    callApi('tags/delete/', 'post', {tagId: id})
      .then(res => {
        if (res.status === 'success') {
          msg.success(`${res.description}`)
          dispatch(loadTags())
        } else {
          if (res.status === 'failed' && res.description) {
            msg.error(`Unable to delete tag. ${res.description}`)
          } else {
            msg.error('Unable to delete tag')
          }
        }
      })
  }
}
export function renameTag (payload, msg, handleEdit) {
  console.log('Actions for renaming Tag', payload)
  return (dispatch) => {
    callApi('tags/rename/', 'post', payload)
      .then(res => {
        if (res.status === 'success' && res.payload) {
          msg.success('Tag has been changed')
          dispatch(loadTags())
        } else {
          if (res.status === 'failed' && res.description) {
            msg.error(`Unable to edit tag name. ${res.description}`)
          } else {
            msg.error('Unable to edit tag name')
          }
        }
        handleEdit()
      })
  }
}