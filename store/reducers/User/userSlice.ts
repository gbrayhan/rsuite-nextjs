import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { initialState } from './UserInitialState'
import { type UserInformation } from './types'
import { login } from '@/store/reducers/User/UserThunks'

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInformation>) => {
      state.information.data = action.payload
    },
    logout: (state) => {
      state.auth = initialState.auth
      state.information = initialState.information
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.information.status = 'loading'
        state.auth.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.information.status = 'finished'
        state.auth.status = 'finished'
        state.information.data = action.payload.data
        state.auth.data.token = action.payload.security.jwtAccessToken
        state.auth.data.refreshToken = action.payload.security.jwtRefreshToken
        state.auth.data.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.auth.status = 'error'
        state.information.status = 'error'
        state.auth.error = action?.error?.message ?? 'Internal Error'
        state.auth.data = initialState.auth.data
        state.information.data = initialState.information.data
      })
  }

})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
