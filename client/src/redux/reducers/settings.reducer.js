import * as ActionTypes from '../constants/constants'

export function APIInfo (state = {}, action) {
  switch (action.type) {
    case ActionTypes.ENABLE_SUCCESS:
      return Object.assign({}, state, {
        apiEnable: action.data
      })
    case ActionTypes.DISABLE_SUCCESS:
      return Object.assign({}, state, {
        apiDisable: action.data
      })
    default:
      return state
  }
}
