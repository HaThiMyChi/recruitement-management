import { Job } from "../../models/Job"
import { JobStatus } from '../../enums/JobStatus';

export interface ListJobs {
    jobs: Job[]
}

export interface JobFilter {
    job: Job;
}