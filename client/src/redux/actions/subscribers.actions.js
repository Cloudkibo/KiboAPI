import * as ActionTypes from '../constants/constants'
import callApi from '../../utility/api.caller.service'

export function updateSubscribersList (data) {
  console.log('Data Fetched From Subscribers', data)
  if (!data[0]) {
    return {
      type: ActionTypes.LOAD_SUBSCRIBERS_LIST,
      data: [],
      locale: []
    }
  }
  var locale = [data[0].locale]
  for (var i = 1; i < data.length; i++) {
    if (locale.indexOf(data[i].locale) === -1) {
      locale.push(data[i].locale)
    }
  }
  return {
    type: ActionTypes.LOAD_SUBSCRIBERS_LIST,
    data,
    locale
  }
}

export function updateAllLocales (data) {
  console.log('Data Fetched From Subscribers', data)
  return {
    type: ActionTypes.LOAD_LOCALES_LIST,
    data
  }
}

export function updateAllSubscribersList (data) {
  console.log('Data Fetched From All Subscribers', data)
  if (!data[0]) {
    return {
      type: ActionTypes.LOAD_ALL_SUBSCRIBERS_LIST,
      data: [],
      locale: []
    }
  }
  var locale = [data[0].locale]
  for (var i = 1; i < data.length; i++) {
    if (locale.indexOf(data[i].locale) === -1) {
      locale.push(data[i].locale)
    }
  }
  let subscribed = data.filter(subscriber => subscriber.isSubscribed)
  let unsubscribed = data.filter(subscriber => !subscriber.isSubscribed)
  let subscribersData = subscribed.concat(unsubscribed)
  return {
    type: ActionTypes.LOAD_ALL_SUBSCRIBERS_LIST,
    data: subscribersData,
    locale
  }
}

export function updateAllSubscribersListNew (data) {
  console.log('Data Fetched From All Subscribers', data)
  if (!data.subscribers[0]) {
    return {
      type: ActionTypes.LOAD_ALL_SUBSCRIBERS_LIST_NEW,
      data: [],
      locale: [],
      count: 0
    }
  }
  var locale = [data.subscribers[0].locale]
  for (var i = 1; i < data.subscribers.length; i++) {
    if (locale.indexOf(data.subscribers[i].locale) === -1) {
      locale.push(data.subscribers[i].locale)
    }
  }
  let subscribed = data.subscribers.filter(subscriber => subscriber.isSubscribed)
  let unsubscribed = data.subscribers.filter(subscriber => !subscriber.isSubscribed)
  let subscribersData = subscribed.concat(unsubscribed)
  return {
    type: ActionTypes.LOAD_ALL_SUBSCRIBERS_LIST_NEW,
    data: subscribersData,
    locale: locale,
    count: data.count
  }
}

export function loadSubscribersList () {
  // here we will fetch list of subscribers from endpoint
  return (dispatch) => {
    callApi('subscribers').then(res => dispatch(updateSubscribersList(res)))
  }
}

export function loadAllSubscribersList () {
  // here we will fetch list of subscribers from endpoint
  return (dispatch) => {
    callApi('subscribers/allSubscribers').then(res => dispatch(updateAllSubscribersList(res)))
  }
}

export function loadAllSubscribersListNew (data) {
  // here we will fetch list of subscribers from endpoint
  console.log('data', data)
  return (dispatch) => {
    callApi('subscribers/getAll', 'post', data).then(res => {
      console.log('response from subscribers', res)
      dispatch(updateAllSubscribersListNew(res.payload))
    })
  }
}

export function allLocales () {
  return (dispatch) => {
    callApi('subscribers/allLocales').then(res => dispatch(updateAllLocales(res.payload)))
  }
}
