import { combineReducers, configureStore, type Dispatch, type Reducer } from '@reduxjs/toolkit'
import { userReducer } from './reducers'
import { type AppState } from './reducers/AppState'
import { activityManager, localStorageManager, rtkErrorNotification } from '@/store/middlewares'

const reHydrateStore = (): AppState | undefined => {
  let stringApplicationState: string | null = null

  if (typeof window === 'undefined') {
    return undefined
  }
  stringApplicationState = localStorage.getItem(
    'NextApplication'
  )

  const objectState: AppState = stringApplicationState !== null && stringApplicationState !== ''
    ? JSON.parse(stringApplicationState)
    : undefined

  if (objectState?.user?.auth?.data?.isAuthenticated &&
    (Boolean((objectState?.user?.auth.data.token))) &&
        (Boolean((objectState?.user?.auth.data.refreshToken)))
  ) {
    return objectState
  }
  localStorage.setItem('NextApplication', '')
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
