export type LoginResponse = {
    security: {
        token: string;
        refreshToken: string;
    }
    user: {
        name: string;
        email: string;
        id: number;
        role: string;
    }

}