import callApi from '../../utility/api.caller.service'
import fileDownload from 'js-file-download'
import {
  handleAction,
  updateUsersList,
  updateAllLocales,
  updateDataObjectsCount,
  updateTopPages,
  updateSurveysGraphData,
  updatePollsGraphData,
  updatePollsByDays,
  updateSurveysByDays,
  updateBroadcastsByDays,
  updateBroadcastsGraphData,
  updateSessionsGraphData,
  updatePagesList,
  updateBroadcastsList,
  updatePollList,
  updatePageSubscribersList,
  updateSurveysList,
  updateSurveyDetails,
  deleteAccountResponse,
  updatePollDetails
    } from './../dispatchers/backdoor.dispatcher'
import * as ActionTypes from '../constants/constants'
export const API_URL = '/api'

export function loadUsersList (data) {
  // here we will fetch list of subscribers from endpoint
  console.log('data for getAllUsers', data)
  return (dispatch) => {
    callApi('backdoor/getAllUsers', 'post', data).then(res => {
      console.log('response from getAllUsers', res)
      dispatch(updateUsersList(res.payload, data))
    })
  }
}

export function loadDataObjectsCount (id) {
  return (dispatch) => {
    callApi(`backdoor/datacount/${id}`).then(res => {
      console.log('res', res)
      dispatch(updateDataObjectsCount(res))
    })
  }
}

export function loadTopPages () {
  return (dispatch) => {
    callApi('backdoor/toppages').then(res => {
      console.log('response from toppages', res)
      dispatch(updateTopPages(res))
    })
  }
}

export function loadSurveysGraphData (days) {
  // here we will fetch list of subscribers from endpoint
  return (dispatch) => {
    callApi(`backdoor/surveysGraph/${days}`)
      .then(res => dispatch(updateSurveysGraphData(res.payload)))
  }
}

export function loadPollsGraphData (days) {
  // here we will fetch list of subscribers from endpoint
  return (dispatch) => {
    callApi(`backdoor/pollsGraph/${days}`)
      .then(res => dispatch(updatePollsGraphData(res.payload)))
  }
}

export function loadPollsByDays (data) {
  // here we will fetch list of subscribers from endpoint
  console.log('data for loadPollsByDays', data)
  return (dispatch) => {
    callApi(`backdoor/getAllPolls`, 'post', data)
      .then(res => {
        console.log('response from loadPollsByDays', res)
        dispatch(updatePollsByDays(res.payload))
      })
  }
}

export function loadSurveysByDays (data) {
  // here we will fetch list of subscribers from endpoint
  console.log('data for loadSurveysByDays', data)
  return (dispatch) => {
    callApi(`backdoor/getAllSurveys`, 'post', data)
      .then(res => {
        console.log('response from surveysByDays', res)
        dispatch(updateSurveysByDays(res.payload))
      })
  }
}

export function loadBroadcastsByDays (data) {
  // here we will fetch list of subscribers from endpoint
  console.log('data for loadBroadcastsByDays', data)
  return (dispatch) => {
    callApi(`backdoor/getAllBroadcasts`, 'post', data)
      .then(res => {
        console.log('response from loadBroadcastsByDays', res)
        dispatch(updateBroadcastsByDays(res.payload))
      })
  }
}

export function loadBroadcastsGraphData (days) {
  // here we will fetch list of subscribers from endpoint
  return (dispatch) => {
    callApi(`backdoor/broadcastsGraph/${days}`)
      .then(res => dispatch(updateBroadcastsGraphData(res.payload)))
  }
}

export function loadSessionsGraphData (days) {
  // here we will fetch list of subscribers from endpoint
  return (dispatch) => {
    callApi(`backdoor/sessionsGraph/${days}`)
      .then(res => dispatch(updateSessionsGraphData(res.payload)))
  }
}
export function loadPagesList (id, data) {
  // here we will fetch list of user pages from endpoint
  console.log('data for loadPagesList', data)
  return (dispatch) => {
    callApi(`backdoor/getAllPages/${id}`, 'post', data).then(res => {
      console.log('response from allpages', res)
      dispatch(updatePagesList(res.payload))
    })
  }
}

export function loadBroadcastsList (id, data) {
  return (dispatch) => {
    callApi(`backdoor/allUserBroadcasts/${id}`, 'post', data)
      .then(res => dispatch(updateBroadcastsList(res.payload)))
  }
}

export function loadPollsList (id, data) {
  console.log('data for loadPollsList', data)
  return (dispatch) => {
    callApi(`backdoor/allUserPolls/${id}`, 'post', data)
      .then(res => dispatch(updatePollList(res.payload)))
  }
}

export function loadPageSubscribersList (id, data) {
  console.log('data for loadPageSubscribersList', data)
  return (dispatch) => {
    callApi(`backdoor/getAllSubscribers/${id}`, 'post', data)
      .then(res => {
        console.log('response from loadPageSubscribersList', res)
        dispatch(updatePageSubscribersList(res.payload))
      })
  }
}

export function loadSurveysList (id, data) {
  return (dispatch) => {
    callApi(`backdoor/allUserSurveys/${id}`, 'post', data)
      .then(res => {
        console.log('response from surveys', res)
        dispatch(updateSurveysList(res.payload))
      })
  }
}

export function loadSurveyDetails (id) {
  return (dispatch) => {
    callApi(`backdoor/surveyDetails/${id}`)
      .then(res => dispatch(updateSurveyDetails(res)))
  }
}
export function loadPollDetails (id) {
  return (dispatch) => {
    callApi(`backdoor/polls/${id}`)
      .then(res => dispatch(updatePollDetails(res)))
  }
}

export function downloadFile () {
  return (dispatch) => {
    callApi(`backdoor/uploadFile`)
    .then(function (data) {
      console.log('response ftom downloadFile', data.status)
      fileDownload(data.payload, 'users.csv')
    })
  }
}
export function sendEmail (msg) {
  return (dispatch) => {
    callApi(`backdoor/sendEmail`)
      .then(res => {
        if (res.status === 'success') {
          msg.success('Email sent successfully!')
        } else {
          msg.error('Email not sent')
        }
      })
  }
}
export function allLocales () {
  return (dispatch) => {
    callApi('backdoor/allLocales').then(res => dispatch(updateAllLocales(res.payload)))
  }
}
export function deleteAccount (id, msg) {
  return (dispatch) => {
    callApi(`backdoor/deleteAccount/${id}`)
      .then(res => {
        console.log('response from deleteAccount', res)
        if (res.status === 'success') {
          msg.success('Account deleted successfully!')
          dispatch(deleteAccountResponse('success'))
        } else {
          msg.error(res.description)
        }
      })
  }
}
export function deleteSubscribers (id, msg) {
  return (dispatch) => {
    callApi(`backdoor/deleteSubscribers/${id}`)
      .then(res => {
        if (res.status === 'success') {
          msg.success('Subscribers deleted successfully!')
          dispatch(loadPagesList(id, {first_page: 'first', last_id: 'none', number_of_records: 10, search_value: ''}))
          dispatch(loadBroadcastsList(id, {first_page: 'first', last_id: 'none', number_of_records: 10, filter_criteria: {search_value: '', type_value: ''}}))
          dispatch(loadPollsList(id, {first_page: 'first', last_id: 'none', number_of_records: 10, filter_criteria: {search_value: '', days: 10}}))
          dispatch(loadSurveysList(id, {first_page: 'first', last_id: 'none', number_of_records: 10, filter_criteria: {search_value: '', days: 10}}))
        } else {
          msg.error(res.description)
        }
      })
  }
}
export function deleteLiveChat (id, msg) {
  console.log('data for deleteLiveChat', id)
  return (dispatch) => {
    callApi(`backdoor/deleteLiveChat/${id}`)
      .then(res => {
        console.log('response from liveChat', res)
        if (res.status === 'success') {
          msg.success('Live Chat deleted successfully!')
          dispatch(loadPagesList(id, {first_page: 'first', last_id: 'none', number_of_records: 10, search_value: ''}))
          dispatch(loadBroadcastsList(id, {first_page: 'first', last_id: 'none', number_of_records: 10, filter_criteria: {search_value: '', type_value: ''}}))
          dispatch(loadPollsList(id, {first_page: 'first', last_id: 'none', number_of_records: 10, filter_criteria: {search_value: '', days: 10}}))
          dispatch(loadSurveysList(id, {first_page: 'first', last_id: 'none', number_of_records: 10, filter_criteria: {search_value: '', days: 10}}))
        } else {
          msg.error(res.description)
        }
      })
  }
}

// Fetch Platform Stats
export function fetchPlatformStats (id) {
  return (dispatch) => {
    callApi(`operational/platformwise`)
      .then(res => dispatch(handleAction(ActionTypes.UPDATE_PLATFORM_STATS, res.payload)))
  }
}

// Fetch Platform Stats Datewise
export function fetchPlatformStatsDateWise (startDate) {
  return (dispatch) => {
    callApi(`operational/platformwise/ranged`, 'post', {startDate: startDate})
      .then(res => dispatch(handleAction(ActionTypes.UPDATE_PLATFORM_STATS_RANGED, res.payload)))
  }
}

// Fetch User Stats
export function fetchUserStats () {
  return (dispatch) => {
    callApi(`operational/userwise`)
      .then(res => dispatch(handleAction(ActionTypes.UPDATE_USER_STATS, res.payload)))
  }
}

// Fetch User Stats Datewise
export function fetchUserStatsDateWise (startDate) {
  return (dispatch) => {
    callApi(`operational/userwise/ranged`, 'post', {startDate: startDate})
      .then(res => dispatch(handleAction(ActionTypes.UPDATE_USER_STATS_RANGED, res.payload)))
  }
}

// Fetch One User Stats
export function fetchOneUserStats (companyId) {
  return (dispatch) => {
    callApi(`operational/userwise/oneUser`, 'post', {companyId: companyId})
      .then(res => dispatch(handleAction(ActionTypes.UPDATE_ONE_USER_STATS, res.payload)))
  }
}

// Fetch One User Stats Datewise
export function fetchOneUserStatsDateWise (startDate, companyId) {
  return (dispatch) => {
    callApi(`operational/userwise/oneUser/ranged`, 'post', {companyId: companyId, startDate: startDate})
      .then(res => dispatch(handleAction(ActionTypes.UPDATE_ONE_USER_STATS_RANGED, res.payload)))
  }
}

// Fetch Page Stats
export function fetchPageStats () {
  return (dispatch) => {
    callApi(`operational/pagewise`)
      .then(res => dispatch(handleAction(ActionTypes.UPDATE_PAGE_STATS, res.payload)))
  }
}

// Fetch Page Stats Datewise
export function fetchPageStatsDateWise (startDate) {
  return (dispatch) => {
    callApi(`operational/pagewise/ranged`, 'post', {startDate: startDate})
      .then(res => dispatch(handleAction(ActionTypes.UPDATE_PAGE_STATS_RANGED, res.payload)))
  }
}

// Fetch One Page Stats
export function fetchOnePageStats (pageId) {
  return (dispatch) => {
    callApi(`operational/pagewise/onePage`, 'post', {pageId: pageId})
      .then(res => dispatch(handleAction(ActionTypes.UPDATE_ONE_PAGE_STATS, res.payload)))
  }
}

// Fetch One Page Stats Datewise
export function fetchOnePageStatsDateWise (startDate, pageId) {
  return (dispatch) => {
    callApi(`operational/pagewise/onePage/ranged`, 'post', {pageId: pageId, startDate: startDate})
      .then(res => dispatch(handleAction(ActionTypes.UPDATE_ONE_PAGE_STATS_RANGED, res.payload)))
  }
}

// Fetch Top Pages
export function fetchTopPages (limit) {
  return (dispatch) => {
    callApi(`operational/pagewise/topPages`, 'post', {limit: limit})
      .then(res => dispatch(handleAction(ActionTypes.UPDATE_TOP_PAGES_KIBODASH, res.payload)))
  }
}

// Fetch Autoposting Platform Stats
export function fetchAutopostingPlatformWise () {
  return (dispatch) => {
    callApi(`operational/autoposting/platformwise`)
      .then(res => dispatch(handleAction(ActionTypes.UPDATE_AUTPOSTING_PLATFORM, res.payload)))
  }
}

// Fetch Autoposting Platform Stats Datewise
export function fetchAutopostingPlatformWiseDateWise (startDate) {
  return (dispatch) => {
    callApi(`operational/autoposting/platformwise/ranged`, 'post', {startDate: startDate})
      .then(res => dispatch(handleAction(ActionTypes.UPDATE_AUTPOSTING_PLATFORM_RANGED, res.payload)))
  }
}

// Fetch Autoposting User Stats
export function fetchAutopostingUserWise (companyId) {
  return (dispatch) => {
    callApi(`operational/autoposting/userwise`, 'post', {companyId: companyId})
      .then(res => dispatch(handleAction(ActionTypes.UPDATE_AUTPOSTING_USER, res.payload)))
  }
}

// Fetch Autoposting User Stats Datewise
export function fetchAutopostingUserWiseDateWise (startDate, companyId) {
  return (dispatch) => {
    callApi(`operational/autoposting/userwise/ranged`, 'post', {companyId: companyId, startDate: startDate})
      .then(res => dispatch(handleAction(ActionTypes.UPDATE_AUTPOSTING_USER_RANGED, res.payload)))
  }
}

// -- Custom Actions ---

export function fetchPlatformStatsWeekly () {
  let date = new Date()
  date.setDate(date.getDate() - 7)
  return (dispatch) => {
    callApi(`operational/platformwise/ranged`, 'post', {startDate: date.toISOString()})
      .then(res => dispatch(handleAction(ActionTypes.UPDATE_WEEKLY_PLATFORM_STATS, res.payload)))
  }
}

export function fetchPlatformStatsMonthly () {
  let date = new Date()
  date.setDate(date.getDate() - 30)
  return (dispatch) => {
    callApi(`operational/platformwise/ranged`, 'post', {startDate: date.toISOString()})
      .then(res => dispatch(handleAction(ActionTypes.UPDATE_MONTHLY_PLATFORM_STATS, res.payload)))
  }
}
