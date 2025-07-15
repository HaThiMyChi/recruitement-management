import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
    sub: number;
    email: string;
    role: string;
    iat: number;
    exp: number;
}

export function decodeToken(token: string): JwtPayload | null {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded;
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
}