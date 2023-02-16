import {AxiosError} from "axios";
import {ErrorResponse} from "@/store/reducers/types/http";


export const errorResponseMapper = (error: unknown): ErrorResponse => {
    return {
        message: (error as AxiosError).message,
        status: (error as AxiosError).response?.status,
        code: (error as AxiosError).code,
    };
};