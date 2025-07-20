import { UserRole } from "../enums/UserRole";
import { UserStatus } from "../enums/UserStatus";

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