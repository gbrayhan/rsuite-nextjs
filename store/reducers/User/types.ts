import {GenericState} from "../types/reducers";

export type UserInformation = {
    firstName: string; lastName: string; email: string; id: number; role: string;
}

export type UserActivity = {
    lastActivityDateTime?: Date; failedAttempts: number;
}

export type UserAuth = {
    token: string; refreshToken: string; timeDurationTokenMiliSeconds: number; generatedDateToken?: Date; isAuthenticated: boolean;
}

export interface UserState {
    information: GenericState<UserInformation>;
    activity: GenericState<UserActivity>;
    auth: GenericState<UserAuth>
}