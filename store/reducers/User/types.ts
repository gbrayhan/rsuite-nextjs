import { type GenericState } from '../types/reducers'

export interface UserInformation {
  firstName: string
  lastName: string
  email: string
  id: number
  role: string
}

export interface UserActivity {
  lastActivityDateTime?: Date
  failedAttempts: number
}

export interface UserAuth {
  token: string
  refreshToken: string
  timeDurationTokenMiliSeconds: number
  generatedDateToken?: Date
  isAuthenticated: boolean
}

export interface UserState {
  information: GenericState<UserInformation>
  activity: GenericState<UserActivity>
  auth: GenericState<UserAuth>
}
