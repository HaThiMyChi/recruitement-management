import { User } from "../../models/User"

export interface RegisterRequest {
    email: string,
    password: string,
    phone: string,
    fullName: string,
    role: string
}

export interface RegisterPayload {
    user: User,
    status?: number
}