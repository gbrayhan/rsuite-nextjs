import { type UserState } from '@/store/reducers/User/types'

export const initialState: UserState = {
  information: {
    data: {
      firstName: '',
      lastName: '',
      email: '',
      id: 0,
      role: ''
    },
    status: 'finished',
    error: ''
  },
  activity: {
    data: {
      lastActivityDateTime: undefined,
      failedAttempts: 0
    },
    status: 'finished',
    error: ''
  },
  auth: {
    data: {
      token: '',
      refreshToken: '',
      expirationRefreshDateTime: '',
      expirationAccessDateTime: '',
      generatedDateToken: undefined,
      isAuthenticated: false
    },
    status: 'finished',
    error: ''
  }
}
