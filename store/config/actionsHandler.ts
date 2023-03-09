import { type AnyAction } from '@reduxjs/toolkit'
import { type AppState } from '../reducers/AppState'

export const actionsHandler = (action: AnyAction, reduxCurrentState: AppState): void => {
  switch (action.type) {
    case 'user/auth/login/fulfilled':
      // eslint-disable-next-line no-debugger
      debugger
      // eslint-disable-next-line no-case-declarations
      const stateStorge: AppState = {
        ...reduxCurrentState,
        user: {
          ...reduxCurrentState.user,
          information: {
            ...reduxCurrentState.user.information,
            data: action.payload.data.user
          },
          auth: {
            ...reduxCurrentState.user.auth,
            data: {
              ...reduxCurrentState.user.auth,
              token: action.payload.security.jwtAccessToken,
              refreshToken: action.payload.security.jwtRefreshToken,
              expirationAccessDateTime: action.payload.expirationAccessTime,
              expirationRefreshDateTime: action.payload.expirationRefreshTime,
              generatedDateToken: new Date(),
              isAuthenticated: true
            }
          }
        }
      }

      localStorage.setItem(
        'NextApplication',
        JSON.stringify(stateStorge)
      )
      break
    case 'user/logout':
      localStorage.setItem('NextApplication', '')
      break
    default:
      break
  }
}

export const tmp = ''
