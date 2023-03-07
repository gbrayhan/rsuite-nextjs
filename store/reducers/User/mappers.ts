import { type LoginResponse } from '@/store/reducers/User/api/types'
import { type UserState } from '@/store/reducers/User/types'
import { initialState } from '@/store/reducers/User/UserInitialState'

export const LoginResponseToEntityUserMapper = (response: LoginResponse): UserState => {
  const { data, security } = response

  return {
    information: {
      data: {
        email: data.email,
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role
      },
      status: 'finished',
      error: ''
    },
    activity: { data: { ...initialState.activity.data }, status: 'finished', error: '' },
    auth: {
      data: {
        generatedDateToken: undefined,
        refreshToken: security.jwtRefreshToken,
        timeDurationTokenMiliSeconds: 0,
        token: security.jwtAccessToken,
        isAuthenticated: true
      },
      status: 'finished',
      error: ''
    }
  }
}
