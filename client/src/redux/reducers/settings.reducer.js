import * as ActionTypes from '../constants/constants'

export function settingsInfo (state = {}, action) {
  switch (action.type) {
    case ActionTypes.ENABLE_SUCCESS:
      return Object.assign({}, state, {
        apiEnable: action.data
      })
    case ActionTypes.DISABLE_SUCCESS:
      return Object.assign({}, state, {
        apiDisable: action.data
      })
    case ActionTypes.RESET_SUCCESS:
      return Object.assign({}, state, {
        resetData: action.data
      })
    case ActionTypes.GET_API_SUCCESS:
      return Object.assign({}, state, {
        apiSuccess: action.data
      })
    case ActionTypes.GET_API_FAILURE:
      return Object.assign({}, state, {
        apiFailure: action.data
      })
    case ActionTypes.ENABLE_SUCCESS_NGP:
      return Object.assign({}, state, {
        apiEnableNGP: action.data
      })
    case ActionTypes.DISABLE_SUCCESS_NGP:
      return Object.assign({}, state, {
        apiDisableNGP: action.data
      })
    case ActionTypes.RESET_SUCCESS_NGP:
      return Object.assign({}, state, {
        resetDataNGP: action.data
      })
    case ActionTypes.GET_API_SUCCESS_NGP:
      return Object.assign({}, state, {
        apiSuccessNGP: action.data
      })
    case ActionTypes.GET_API_FAILURE_NGP:
      return Object.assign({}, state, {
        apiFailureNGP: action.data
      })
    case ActionTypes.SAVE_SWITCH_STATE:
      return Object.assign({}, state, {
        switchState: action.data
      })
    case ActionTypes.GET_GREETING_MESSAGE:
      return Object.assign({}, state, {
        greetingMessage: action.data
      })
    default:
      return state
  }
}
