import { combineReducers } from 'redux'
import dashboardReducer from './dashboard/reducer'
import userAccountReducer from './user-account/reducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    dashboard: dashboardReducer,
    userAccount: userAccountReducer,
    ...asyncReducers
  })
}

export default makeRootReducer
