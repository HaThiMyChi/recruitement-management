import { JobLogDetail } from "../../../app/types/jobLogTypes";
import ActionBadge from "./ActionBadge";

interface JobLogSummaryProps {
    jobLog: JobLogDetail;
}

const JobLogSummary: React.FC<JobLogSummaryProps> = ({jobLog}) => {
    return (
        <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '20px'
        }}>
             <div style={detailRowStyle}>
                <strong>Log ID:</strong>
                <span>{jobLog.jobId}</span>
            </div>
            <div style={detailRowStyle}>
                <strong>Job:</strong>
                <span>{jobLog.jobTitle} (ID: {jobLog.jobId})</span>
            </div>
            <div style={detailRowStyle}>
                <strong>User:</strong>
                <span>{jobLog.userName} (ID: {jobLog.userId})</span>
            </div>
            <div style={detailRowStyle}>
                <strong>Action:</strong>
                <ActionBadge action={jobLog.action}/>
            </div>
            <div style={detailRowStyle}>
                <strong>Timestamp:</strong>
                <span>{new Date(jobLog.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    );
};

const detailRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    padding: '8px 0',
    borderBottom: '1px solid #eee'
};

export default JobLogSummary;