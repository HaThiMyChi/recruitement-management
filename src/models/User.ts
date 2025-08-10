import { UserRole } from "../enums/UserRole";
import { UserStatus } from "../enums/UserStatus";

export interface User {
    id: number,
    email: string,
    phone: string,
    password: string, // Hashed
    fullName: string,
    role: UserRole,
    status: UserStatus,
    createdAt: Date,
    updatedAt: Date,
}