import { combineReducers } from 'redux'

import {basicInfo} from './basicinfo.reducer'

const appReducer = combineReducers({
  basicInfo
})

export default appReducer
