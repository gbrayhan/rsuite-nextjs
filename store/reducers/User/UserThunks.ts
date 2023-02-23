import {createAsyncThunk} from '@reduxjs/toolkit'
import {accessTokenByRefreshTokenAPI, loginAPI} from "@/store/reducers/User/api/userAPI";
import {RootState} from "@/store/store";
import {LoginResponse} from "@/store/reducers/User/api/types";
import {LoginResponseToEntityUserMapper} from "@/store/reducers/User/mappers";


export const login = createAsyncThunk(
    "user/auth/login",
    async ({email, password}: { email: string, password: string }, thunkAPI) => {
        try {
            const response: LoginResponse = await loginAPI(email, password);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getAccessTokenUsingRefreshToken = createAsyncThunk(
    "auth/getAccessTokenUsingRefreshToken",
    async (arg, thunkAPI) => {
        const state: RootState = thunkAPI.getState();
        return accessTokenByRefreshTokenAPI(state.user.auth.data.refreshToken);
    }
);
