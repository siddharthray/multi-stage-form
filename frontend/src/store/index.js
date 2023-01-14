import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import profile, { customizedMiddleware } from './profile'

const reducer = combineReducers({
  profile
})

const store = configureStore({
  reducer,
  middleware: customizedMiddleware
})

export default store;