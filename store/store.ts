import { AnyAction, combineReducers, configureStore, type Dispatch, type Reducer } from '@reduxjs/toolkit'
import { userReducer } from './reducers'
// import {
//    logout,
//    setActionDataElement,
// } from "../reducers/authentication/authSlice";
import { type AppState } from './reducers/AppState'
import { activityManager, localStorageManager, rtkErrorNotification } from '@/store/middlewares'

const reHydrateStore = () => {
  let stringApplicationState: string | null = null
  if (typeof window !== 'undefined') {
    stringApplicationState = localStorage.getItem(
      'NextApplication'
    )
  }
  const objectState = stringApplicationState
    ? JSON.parse(stringApplicationState)
    : undefined

  if (
    objectState?.auth?.user?.data &&
        objectState?.auth?.security?.data?.accessToken
  ) {
    return JSON.parse(stringApplicationState ?? '')
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem('NextApplication', '')
  }
  return undefined
}

const combinedReducer = combineReducers({
  user: userReducer
})
const rootReducer: Reducer = (state, action) => {
  switch (action.type) {
    case 'logout':
      // eslint-disable-next-line no-param-reassign
      state = undefined
      break
    default:
      break
  }
  return combinedReducer(state, action)
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageManager).concat(activityManager).concat(rtkErrorNotification)
})

export type AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch

export type RootState = ReturnType<typeof store.getState>

export interface AppThunk {
  dispatch: Dispatch
  getState: () => AppState
}

export default store
