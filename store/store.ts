import { combineReducers, configureStore, type Dispatch, type Reducer } from '@reduxjs/toolkit'
import { userReducer } from './reducers'
import { type AppState } from './reducers/AppState'
import { activityManager, localStorageManager, rtkErrorNotification } from '@/store/middlewares'

const reHydrateStore = (): { string: undefined } | undefined => {
  let stringApplicationState: string | null = null

  if (typeof window === 'undefined') {
    return
  }
  stringApplicationState = localStorage.getItem(
    'NextApplication'
  )

  const objectState = stringApplicationState !== null && stringApplicationState !== ''
    ? JSON.parse(stringApplicationState)
    : undefined

  if (
    (Boolean((objectState?.auth?.user?.data))) &&
        (Boolean((objectState?.auth?.security?.data?.accessToken)))
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

export type RootState = ReturnType<typeof store.getState>

export interface AppThunk {
  dispatch: Dispatch
  getState: () => AppState
}

export default store
