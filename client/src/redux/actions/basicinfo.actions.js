import * as ActionTypes from '../constants/constants'
import callApi from '../../utility/api.caller.service'
import auth from '../../utility/auth.service'

export function setBrowserName (data) {
  return {
    type: ActionTypes.LOAD_BROWSER_NAME,
    data
  }
}

export function setBrowserVersion (data) {
  return {
    type: ActionTypes.LOAD_BROWSER_VERSION,
    data
  }
}

export function setSocketStatus (data) {
  return {
    type: ActionTypes.SET_SOCKET_STATUS,
    data
  }
}
