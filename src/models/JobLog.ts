import { JobLogAction } from "../enums/JobLogAction";

export interface JobLog {
    id: number;
    jobId: number;   // Reference to the job being logged
    userId: number;  // Reference to the user who performed the action
    action: JobLogAction;
    details: string;
    createdAt: Date;
}