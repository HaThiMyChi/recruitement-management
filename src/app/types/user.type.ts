import { UserRole } from "../../enums/UserRole";
import { UserStatus } from "../../enums/UserStatus";

export interface UserInfo {
    id: number,
    email: string,
    phone: string,
    fullName: string,
    role: UserRole,
    status: UserStatus,
    avartar?: string,
    address?: string,
    companyName?: string,
    companyLogo?: string,
    companyAddress?: string,
    companySize?: string,
    companyWebsite?: string,
    createdAt: Date,
    updatedAt: Date
}

export interface UserRequestUpdate  {
    id?: number,
    email?: string,
    fullName?: string,
    phone?: string,
    address?: string,
    companyName?: string,
    companyAddress?: string,
    companySize?: string,
    companyWebsite?: string
}

export interface UserPayload {
    user: UserInfo,
    status?: number
}