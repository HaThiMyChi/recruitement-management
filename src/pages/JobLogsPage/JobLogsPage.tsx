import React, { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Table, Form, Button, Row, Col, Pagination, Container } from "react-bootstrap";
import JobLogsHeader from "./components/JobLogsHeader";
import { useNavigate } from "react-router-dom";
import { FetchJobLogsParams, JobLogSummary, PaginatedJobLogsResponse, PaginationMeta } from "../../app/types/jobLogTypes";
import ErrorMessage from "../../components/shared/ErrorMessage";
import JobLogsTable from "./components/JobLogsTable";
import { deleteJobLog, fetchJobLogs } from "../../services/jobLogServices";
import JobLogsPagination from "./components/JobLogsPagination";
import ConfirmationModal from "../../components/shared/ConfirmationModal";

interface JobLogsPageProps {
  onSelectJobLog?: (logId: number) => void;
}

const JobLogsPage: React.FC<JobLogsPageProps>= ({onSelectJobLog}) => {
  const navigate = useNavigate();
  const [jobLogsData, setJobLogsData] = useState<PaginatedJobLogsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string| null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedLogIds, setSelectedLogIds] = useState<number[]>([]);
  const [logToDelete, setLogToDelete] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  
  // Use a ref to store selectedLogIds to access current value without creating dependencies
  const selectedLogIdsRef = useRef<number[]>([]);

  const [filters, setFilters] = useState<FetchJobLogsParams>({
    page: 1,
    limit: 10,
    job_id: '',
    user_id: '',
    action: ''
  });

  const handleFilterSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFilters(prevFilters => ({...prevFilters, page: 1}));
  }

  const handleFilterChange  = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleJobLogClick = (logId: number) => {
     
  }

  const handleCheckboxChange  = (logId: number, checked: boolean) => {
    
  }

   const handleDeleteClick = (logId: number) => {
    setLogToDelete(logId);
    setDeleteModalOpen(true);
  };

  const handlePageChange = (newPage: number) => {

  };

  const handleDeleteConfirm = async() => {
    if (logToDelete === null) return;

    setLoading(true);
    setError(null);

    try {
      await deleteJobLog(logToDelete);
      setSuccessMessage(`Job log #${logToDelete} was successfully deleted.`);

      // Remove from selected IDs if it was selected
      setSelectedLogIds(prev => prev.filter(id => id !== logToDelete));

      // Refresh tha data
      await loadJobLogs(filters);
    } catch(err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while deleting the job log.');
      }
    } finally {
      setLoading(false);
      setDeleteModalOpen(false);
      setLogToDelete(null);
    }

  }

  const loadJobLogs = useCallback(async(currentFilters: FetchJobLogsParams) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const paramsToFetch: FetchJobLogsParams = {...currentFilters};

      // Ensure only valid numbers are passed for numeric fields, or they are omitted
      if (paramsToFetch.job_id && !isNaN(Number(paramsToFetch.job_id))) {
        paramsToFetch.job_id = Number(paramsToFetch.job_id);
      } else {
        delete paramsToFetch.job_id;
      }

      if (paramsToFetch.user_id && !isNaN(Number(paramsToFetch.user_id))) {
        paramsToFetch.user_id = Number(paramsToFetch.user_id);
      } else {
        delete paramsToFetch.user_id;
      }
      
      if (!paramsToFetch.action) {
        delete paramsToFetch.action;
      }

      const data = await fetchJobLogs(paramsToFetch);
      setJobLogsData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies here, we're using the ref instead

  useEffect(() => {
    loadJobLogs(filters);
  }, [loadJobLogs, filters]);


  const logs: JobLogSummary[] = jobLogsData?.data || [];
  const meta: PaginationMeta | undefined = jobLogsData?.meta;
  return (
    <div className='main_content'>
      <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
        <JobLogsHeader
          filters={filters}
          onFilterChange={handleFilterChange }
          onFilterSubmit={handleFilterSubmit}
        />

        {error && <ErrorMessage message={error} />}

        {successMessage && (
          <div style={{
            padding: '10px 15px',
            backgroundColor: '#d4edda',
            color: '#155724',
            borderRadius: '4px',
            marginBottom: '15px'
          }}>
            {successMessage}
          </div>
        )}

        <>
          <JobLogsTable
            logs={logs} 
            onSelectJobLog={handleJobLogClick}
            selectedLogIds={selectedLogIds}
            onCheckboxChange={handleCheckboxChange}
            onDeleteLog={handleDeleteClick}
          />

          <JobLogsPagination meta={meta} onPageChange={handlePageChange} />
        </>

        <ConfirmationModal
          isOpen={deleteModalOpen}
          title="Delete Job Log"
          message={`Are you sure you want to delete job log #${logToDelete}? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteModalOpen(false)}
        />

      </div>
    </div>
  );
};

export default JobLogsPage;
