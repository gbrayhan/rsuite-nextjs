import React from 'react'
import { type AnyAction, type Dispatch, type Middleware, type MiddlewareAPI } from '@reduxjs/toolkit'
import { isRejectedWithValue } from '@reduxjs/toolkit'

import { Notification, toaster } from 'rsuite'
import { actionsHandler } from '@/store/config/actionsHandler'
import { type AppThunk } from '@/store/store'

export const rtkErrorNotification: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (isRejectedWithValue(action)) {
    void toaster.push(<Notification>{action.payload?.response?.data?.message ?? 'some error'}</Notification>, {
      placement: 'topEnd'
    })

    // toast.warn({ title: 'Async error!', message: action.error.data.message })
  }

  return next(action)
}

export const activityManager = ({ dispatch, getState }: AppThunk) => (next: Dispatch) => (action: AnyAction) => {
  // const reduxCurrentState = getState()
  // const dateNow = new Date()

  // if (!action.type.includes('auth/setActionDataElement') && !action.type.includes('/pending')) {
  // dispatch(
  //   setActionDataElement({
  //     key: "lasActivityDateTime",
  //   value: dateNow.getTime(),
  // })
  // );
  // }

  return next(action)
}

export const localStorageManager = ({ getState, dispatch }: AppThunk) => (next: Dispatch) => (action: AnyAction) => {
  const result = next(action)
  const reduxCurrentState = getState()
  actionsHandler(action, reduxCurrentState)
  return result
}
