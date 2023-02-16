import {LoginResponse} from "@/store/reducers/User/api/types";
import {UserState} from "@/store/reducers/User/types";
import {initialState} from "@/store/reducers/User/UserInitialState";


export const LoginResponseToEntityUserMapper = (response: LoginResponse): UserState => {
    let user: UserState = initialState;
    user.information.data = {
        email: response.user.email,
        id: response.user.id,
        name: response.user.name,
        role: response.user.role
    }

    user.auth.data = {
        generatedDateToken: undefined,
        refreshToken: response.security.refreshToken,
        timeDurationTokenMiliSeconds: 0,
        token: response.security.token,
        isAuthenticated: true,
    }

    return user;
};
