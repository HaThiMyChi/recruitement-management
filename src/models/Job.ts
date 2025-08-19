import { JobStatus } from "../enums/JobStatus";

export interface Job {
    id: number;
    userId: number;   // Reference to the recruiter/admin who created the job
    title: string;
    description: string;
    requirements?: string;
    benefits?: string;
    location: string;
    jobType: string;
    minSalary?: number;
    maxSalary?: number;
    status: JobStatus;
    publishedAt: string;
    expiredAt: string;
    createdAt: string;
    updatedAt: string;

}