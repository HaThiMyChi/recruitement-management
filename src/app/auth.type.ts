export interface LoginRequest {
    emailOrPhone: string;
    password: string;
}

export interface LoginPayload {
    token: string;
    user: {
        email: string;
        role: string;
        exp: number;
        iat: number;
        sub: number;
    }
}