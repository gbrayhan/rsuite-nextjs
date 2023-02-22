import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {initialState} from "./UserInitialState";
import {UserInformation} from "./types";
import {login} from "@/store/reducers/User/UserThunks";


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserInformation>) => {
            state.information.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.information.status = "loading";
                state.auth.status = "loading";
            })
            .addCase(login.fulfilled, (state, action) => {
                debugger;
                state.information.status = "finished";
                state.auth.status = "finished";
                state.information.data = action.payload.data;
                state.auth.data.token = action.payload.security.jwtAccessToken;
                state.auth.data.refreshToken = action.payload.security.jwtRefreshToken;
                state.auth.data.isAuthenticated = true;
                state.auth.data.generatedDateToken = new Date();
            })
            .addCase(login.rejected, (state, action) => {
                state.auth.status = "error";
                state.information.status = "error";
                state.auth.error = action.error.message || "Internal Error";
                state.auth.data = initialState.auth.data;
                state.information.data = initialState.information.data;
            });
    },

})

export const {setUser} = userSlice.actions
export default userSlice.reducer
