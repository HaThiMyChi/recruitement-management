import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JobLogDetail } from "../../app/types/jobLogTypes";
import JobLogsHeader from "../JobLogsPage/components/JobLogsHeader";
import JobLogHeader from "./components/JobLogHeader";
import JobLogSummary from "./components/JobLogSummary";
import { fetchJobLogById } from "../../services/jobLogServices";
import ErrorMessage from "../../components/shared/ErrorMessage";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

interface JobLogDetailPageProps {
    jobLogId?: number;
}

const JobLogDetailPage: React.FC<JobLogDetailPageProps> = ({jobLogId}) => {
    const params = useParams<{id: string}>();
    console.log('params', params)
    const id = jobLogId ? jobLogId.toString() : params.id;

    const [jobLog, setJobLog] = useState<JobLogDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadJobLogDetail = async() => {
            if (!id) {
                setError('No job log ID provided')
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const data = await fetchJobLogById(parseInt(id, 10));
                setJobLog(data);
            } catch(err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unexpected error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        loadJobLogDetail();

    }, [id]);

    if (loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return <ErrorMessage message={error} />
    }
    
    if (!jobLog) {
        return <ErrorMessage message="Job log not found" />
    }

    return (
        <div style={{padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto'}}>
            {!jobLogId && <JobLogHeader />}
            <JobLogSummary jobLog={jobLog} />
        </div>
    )

}

export default JobLogDetailPage;