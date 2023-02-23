import {AnyAction} from "@reduxjs/toolkit";
import {AppState} from "../reducers/AppState";

export const actionsHandler = (action: AnyAction, reduxCurrentState: AppState) => {
    switch (action.type) {
        case "auth/authLogin/fulfilled":
            localStorage.setItem(
                "NextApplication",
                JSON.stringify({
                    ...reduxCurrentState,
                    auth: {
                        user: {
                            ...reduxCurrentState.user,
                            data: action.payload.data.user,
                        },
                        security: {
                            ...reduxCurrentState.user.auth,
                            data: {
                                ...reduxCurrentState.user.auth,
                                accessToken: action.payload.data.token,
                            },
                        },
                    },
                })
            );
            break;
        case "logout":
            localStorage.setItem("NextApplication", "");
            break;
        default:
            break;
    }
};

export const tmp = "";
