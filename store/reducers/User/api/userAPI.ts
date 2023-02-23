import axios, {AxiosResponse} from "axios";
import {BACKEND_URL} from "@/const/env";
import {LoginResponse} from "@/store/reducers/User/api/types";

export function loginAPI(email: string, password: string): Promise<LoginResponse> {
    const data = {email, password};
    return axios({
        url: `${BACKEND_URL}/auth/login`,
        method: "post",
        data,
        timeout: 4000,
        headers: {
            "content-type": "application/json",
        },
    }).then((response: AxiosResponse<LoginResponse>) => {
        return response.data;
    })

}


export function accessTokenByRefreshTokenAPI(refreshToken: string):  Promise<LoginResponse> {
    const data = {refreshToken};

    return axios({
        method: "post",
        data,
        headers: {
            "content-type": "application/json",
        },
        url: `${BACKEND_URL}/api/auth/refresh`
    }).then((response: AxiosResponse<LoginResponse>) => response.data);
}
