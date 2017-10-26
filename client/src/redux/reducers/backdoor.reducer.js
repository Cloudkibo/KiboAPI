import * as ActionTypes from '../constants/constants'

const initialState = {
  users: [],
  broadcasts: [],
  pages: [],
  polls: [],
  dataobjects: [],
  toppages: [],
  currentUser: null
}

export function UsersInfo (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOAD_USERS_LIST:
      return Object.assign({}, state, {
        users: action.data
      })

    default:
      return state
  }
}
export function dataObjectsInfo (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOAD_DATA_OBJECTS_LIST:
      return Object.assign({}, state, {
        dataobjects: action.data
      })

    default:
      return state
  }
}
export function topPagesInfo (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOAD_TOP_PAGES_LIST:
      return Object.assign({}, state, {
        toppages: action.data
      })

    default:
      return state
  }
}
export function PagesInfo (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOAD_BACKDOOR_PAGES_LIST:
      return Object.assign({}, state, {
        pages: action.data
      })
    default:
      return state
  }
}

export function BroadcastsInfo (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOAD_BROADCASTS_LIST:
      return Object.assign({}, state, {
        broadcasts: action.data
      })

    default:
      return state
  }
}

export function PageSubscribersInfo (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOAD_PAGE_SUBSCRIBERS_LIST:
      return Object.assign({}, state, {
        pageSubscribers: action.data
      })

    default:
      return state
  }
}
export function PollsInfo (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOAD_POLLS_LIST:
      return Object.assign({}, state, {
        polls: action.data
      })

    default:
      return state
  }
}

export function SurveysInfo (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOAD_SURVEYS_LIST:
      return Object.assign({}, state, {
        surveys: action.data
      })

    default:
      return state
  }
}

export function getCurrentUser (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SAVE_USER_INFORMATION:
      console.log('getCurrentUser', action.data)
      return Object.assign({}, state, {
        currentUser: action.data
      })

    default:
      return state
  }
}
