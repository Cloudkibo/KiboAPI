import * as ActionTypes from '../constants/constants'
import callApi from '../../utility/api.caller.service'

export function updatePollsList (data) {
  console.log('updatePollsList')
  console.log(data)
  let polls = data.polls
  let pagepolls = data.pollpages
  let responsesCount = data.responsesCount
  console.log('updated')
  for (let j = 0; j < polls.length; j++) {
    let pagepoll = pagepolls.filter((c) => c.pollId === polls[j]._id)
    polls[j].sent = pagepoll.length// total sent
    let pagepollTapped = pagepoll.filter((c) => c.seen === true)
    polls[j].seen = pagepollTapped.length // total tapped
    for (let i = 0; i < responsesCount.length; i++) {
      if (responsesCount[i]._id === polls[j]._id) {
        polls[j].responses = responsesCount[i].count
        break
      } else {
        polls[j].responses = 0
      }
    }
    console.log('updated polls')
    console.log(polls[j])
  }
  var newPoll = polls.reverse()
  return {
    type: ActionTypes.FETCH_POLLS_LIST,
    data: newPoll
  }
}

export function createPoll (data) {
  console.log('createpolldata', data)
  return {
    type: ActionTypes.ADD_POLL,
    data
  }
}

export function sendpollresp (data) {
  return {
    type: ActionTypes.SEND_POLL,
    data
  }
}

export function loadPollsList () {
  console.log('Loading broadcast list')
  return (dispatch) => {
    callApi('polls').then(res => dispatch(updatePollsList(res.payload)))
  }
}

export function sendPollSuccess () {
  return {
    type: ActionTypes.SEND_POLL_SUCCESS
  }
}

export function sendPollFailure () {
  return {
    type: ActionTypes.SEND_POLL_FAILURE
  }
}

export function clearAlertMessage () {
  return {
    type: ActionTypes.CLEAR_ALERT
  }
}

export function sendpoll (poll, msg) {
  return (dispatch) => {
    callApi('polls/send', 'post', poll)
      .then(res => {
        dispatch(sendpollresp(res.payload))
        console.log('sendpollresp', res)
        if (res.status === 'success') {
          msg.success('Poll sent successfully')
          dispatch(sendPollSuccess())
        } else {
          msg.success('Poll not sent!')
          dispatch(sendPollFailure())
        }
      }
    )
  }
}
export function sendPollDirectly (poll, msg) {
  return (dispatch) => {
    callApi('polls/sendPollDirectly', 'post', poll)
      .then(res => {
        if (res.status === 'success') {
          msg.success('Poll sent successfully')
        } else {
          msg.error('Poll not sent!')
        }
      }
    )
  }
}
export function addPoll (token, data) {
  // here we will add the broadcast
  console.log('Loading broadcast list')
  return (dispatch) => {
    callApi('polls/create', 'post', data)
      .then(res => dispatch(createPoll(res.payload)))
  }
}
function rank (items, prop) {
  // declare a key->count table
  var results = {}

  // loop through all the items we were given to rank
  var len = items.length
  for (var i = 0; i < len; i++) {
    // get the requested property value (example: License)
    var value = items[i][prop]

    // increment counter for this value (starting at 1)
    var count = (results[value] || 0) + 1
    results[value] = count
  }

  var ranked = []

  // loop through all the keys in the results object
  for (var key in results) {
    // here we check that the results object *actually* has
    // the key. because of prototypal inheritance in javascript there's
    // a chance that someone has modified the Object class prototype
    // with some extra properties. We don't want to include them in the
    // ranking, so we check the object has it's *own* property.
    if (results.hasOwnProperty(key)) {
      // add an object that looks like {value:"License ABC", count: 2}
      // to the output array
      ranked.push({value: key, count: results[key]})
    }
  }

  // sort by count descending
  return ranked.sort(function (a, b) { return b.count - a.count })
}
export function showresponses (data) {
  /* var d = [{'response': 'abc', //response submitted by subscriber
   'pollId': '110',
   'subscriberid':'1212'},{'response': 'abc', //response submitted by subscriber
   'pollId': '1100',
   'subscriberid':'12112'},{'response': 'xyz', //response submitted by subscriber
   'pollId': '1010',
   'subscriberid':'10212'},
   {'response': 'lmn', //response submitted by subscriber
   'pollId': '10190',
   'subscriberid':'109212'},
   {'response': 'lmn', //response submitted by subscriber
   'pollId': '10810',
   'subscriberid':'1212'}
   ,{'response': 'lmn', //response submitted by subscriber
   'pollId': '10010',
   'subscriberid':'102012'}]; */
  console.log('res', data)
  var sorted = rank(data, 'response')
  console.log('sorted', sorted)
  return {
    type: ActionTypes.ADD_POLL_RESPONSES,
    sorted
  }
}
export function showresponsesfull (data) {
  /* var d = [{'response': 'abc', //response submitted by subscriber
   'pollId': '110',
   'subscriberid':'1212'},{'response': 'abc', //response submitted by subscriber
   'pollId': '1100',
   'subscriberid':'12112'},{'response': 'xyz', //response submitted by subscriber
   'pollId': '1010',
   'subscriberid':'10212'},
   {'response': 'lmn', //response submitted by subscriber
   'pollId': '10190',
   'subscriberid':'109212'},
   {'response': 'lmn', //response submitted by subscriber
   'pollId': '10810',
   'subscriberid':'1212'}
   ,{'response': 'lmn', //response submitted by subscriber
   'pollId': '10010',
   'subscriberid':'102012'}]; */
  return {
    type: ActionTypes.ADD_POLL_RESPONSES_FULL,
    data
  }
}
export function getpollresults (pollid) {
  return (dispatch) => {
    callApi(`polls/responses/${pollid}`)
      .then(res => {
        dispatch(showresponses(res.payload))
        dispatch(showresponsesfull(res.payload))
      })
  }
}
export function deletePoll (id, msg) {
  return (dispatch) => {
    console.log('id', id)
    callApi(`polls/deletePoll/${id}`, 'delete')
      .then(res => {
        console.log('Response Delete', res)
        if (res.status === 'success') {
          msg.success('Poll deleted successfully')
          dispatch(loadPollsList())
        } else {
          if (res.status === 'failed' && res.description) {
            msg.error(`Failed to delete poll. ${res.description}`)
          } else {
            msg.error('Failed to delete poll')
          }
        }
      })
  }
}
/* A poll should NOT be allowed to edit */

// export function editPoll (token, data) {
//   // here we will edit the broadcast
//   return {
//     type: ActionTypes.EDIT_POLL,
//     data
//   }
// }
