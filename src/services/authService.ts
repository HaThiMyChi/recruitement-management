import { UserRole } from "../enums/UserRole";

export const getCurrentUserRole = (): UserRole => {
    const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
    return userInfo.role || null;
}

export const getCurrentUserId = (): number => {
    const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
    return userInfo.sub || null;
}