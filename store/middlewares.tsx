import type {Middleware, MiddlewareAPI} from '@reduxjs/toolkit'
import {AnyAction, Dispatch, isRejectedWithValue} from '@reduxjs/toolkit'

import {Notification, toaster} from 'rsuite';
import {actionsHandler} from "@/store/config/actionsHandler";
import {AppThunk} from "@/store/store";

export const rtkErrorNotification: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        // console.warn('We got a rejected action!')
        toaster.push(<Notification>{action.payload?.response?.data?.message || "some error"}</Notification>, {
            placement: 'topEnd',
        });

        // toast.warn({ title: 'Async error!', message: action.error.data.message })
    }

    return next(action)
}

export const activityManager = ({dispatch, getState}: AppThunk) => (next: Dispatch) => (action: AnyAction) => {
    const reduxCurrentState = getState();

    const dateNow = new Date();

    if (!action.type.includes("auth/setActionDataElement") && !action.type.includes("/pending")) {
        // dispatch(
        //   setActionDataElement({
        //     key: "lasActivityDateTime",
        //   value: dateNow.getTime(),
        //})
        // );
    }

    if (!action.type.includes("auth/")
        // dateNow.getTime() - reduxCurrentState.user.auth.timeDurationTokenMiliSeconds >
        //reduxCurrentState.user.activity.lastActivityDateTime

    ) {
        // dispatch(logout());
        return {};
    }

    return next(action);
};


export const localStorageManager = ({getState}: AppThunk) => (next: Dispatch) => (action: AnyAction) => {
    const result = next(action);
    const reduxCurrentState = getState();
    actionsHandler(action, reduxCurrentState);
    return result;
};