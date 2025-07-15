import { ApplicationStatus } from "../enums/ApplicationStatus";
import { ApplicationQuestionAnswer } from "./ApplicationQuestionAnswer";

export interface JobApplication {
    id: number;
    jobId: number;   // Reference to the job being applied for
    userId: number;  // Reference to the candidate who applied
    status: ApplicationStatus;
    resumeUrl?: string;  // URL/path to the candidate's resume
    coverLetter?: string;
    answers?: ApplicationQuestionAnswer[];
    candidateNote?: string;
    recruiterNotes?: string;
    createdAt: Date;
    updatedAt: Date;
}