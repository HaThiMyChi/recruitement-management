import React, { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Table, Form, Button, Row, Col, Pagination, Container } from "react-bootstrap";
import JobLogsHeader from "./components/JobLogsHeader";
import { useNavigate } from "react-router-dom";
import { FetchJobLogsParams, JobLogSummary, PaginatedJobLogsResponse, PaginationMeta } from "../../app/types/jobLogTypes";
import ErrorMessage from "../../components/shared/ErrorMessage";
import JobLogsTable from "./components/JobLogsTable";
import { deleteJobLog, deleteMultipleJobLogs, fetchJobLogs } from "../../services/jobLogServices";
import JobLogsPagination from "./components/JobLogsPagination";
import ConfirmationModal from "../../components/shared/ConfirmationModal";
import BulkActions from "./components/BulkActions";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

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
    const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState<boolean>(false);

  // Use a ref to store selectedLogIds to access current value without creating dependencies
  const selectedLogIdsRef = useRef<number[]>([]);

  // Update the ref whenever selectedLogIds changes
  useEffect(() => {
    selectedLogIdsRef.current = selectedLogIds;
    console.log('selectedLogIdsRef.current', selectedLogIdsRef.current)
  }, [selectedLogIds]);

  const [filters, setFilters] = useState<FetchJobLogsParams>({
    page: 1,
    limit: 10,
    jobId: '',
    userId: '',
    action: ''
  });

  const handleFilterSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFilters(prevFilters => ({...prevFilters, page: 1}));
  }

  const handleFilterChange  = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const {name, value} = target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleJobLogClick = (logId: number) => {
    if (onSelectJobLog) {
      onSelectJobLog(logId);
    } else {
      navigate(`/admin/job-logs/${logId}`)
    }
  }

  const handleCheckboxChange  = (logId: number, checked: boolean) => {
    if (checked) {
      setSelectedLogIds(prev => [...prev, logId]);
    } else {
      setSelectedLogIds(prev => prev.filter(id => id !== logId));
    }
  }

   const handleDeleteClick = (logId: number) => {
    setLogToDelete(logId);
    setDeleteModalOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      page: newPage,
    }));
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
      if (paramsToFetch.jobId && !isNaN(Number(paramsToFetch.jobId))) {
        paramsToFetch.jobId = Number(paramsToFetch.jobId);
      } else {
        delete paramsToFetch.jobId;
      }

      if (paramsToFetch.userId && !isNaN(Number(paramsToFetch.userId))) {
        paramsToFetch.userId = Number(paramsToFetch.userId);
      } else {
        delete paramsToFetch.userId;
      }
      
      if (!paramsToFetch.action) {
        delete paramsToFetch.action;
      }

      const data = await fetchJobLogs(paramsToFetch);
      setJobLogsData(data);

      // Use the ref to get current selected IDs without creating a dependency
      const currentSelectedIds = selectedLogIdsRef.current;
      if (currentSelectedIds.length > 0) {
        const existingIds = data.data.map(log => log.id);
        const filteredIds = currentSelectedIds.filter(id => existingIds.includes(id));
        if (filteredIds.length !== currentSelectedIds.length) {
          setSelectedLogIds(filteredIds);
        }
      }
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

  const handleBulkDeleteConfirm = async () => {
    if (selectedLogIds.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const result = await deleteMultipleJobLogs(selectedLogIds);

      // Show success message with details
      setSuccessMessage(`Successfully deleted ${result.deleted} job log(s).${
        result.failed.length > 0 ? `Failed to delete ${result.failed.length} job log(s).` : ''
      }`);

      // Clear selection
      setSelectedLogIds([]);

      // refresh the data
      await loadJobLogs(filters);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while deleting job logs.');
      }
    } finally {
      setLoading(false);
      setBulkDeleteModalOpen(false);
    }

  }

  const handleClearSelection = () => {
    setSelectedLogIds([]);
  }

  const handleBulkDeleteClick = () => {
    if (selectedLogIds.length === 0) return;
    setBulkDeleteModalOpen(true);
  }


  useEffect(() => {
    loadJobLogs(filters);
  }, [loadJobLogs, filters]);

  if (loading && !jobLogsData) {
    return <LoadingSpinner />
  }

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

        <BulkActions 
          selectedCount={selectedLogIds.length}
          onDeleteSelected={handleBulkDeleteClick}
          onClearSelection={handleClearSelection}
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
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
        )}
       
        <ConfirmationModal
          isOpen={deleteModalOpen}
          title="Delete Job Log"
          message={`Are you sure you want to delete job log #${logToDelete}? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteModalOpen(false)}
        />

        <ConfirmationModal
          isOpen={bulkDeleteModalOpen}
          title="Delete Multiple Job Logs"
          message={`Are you sure you want to delete ${selectedLogIds.length} job log(s)? This action cannot be undone.`}
          confirmText="Delete All"
          cancelText="Cancel"
          onConfirm={handleBulkDeleteConfirm}
          onCancel={() => setBulkDeleteModalOpen(false)}
        />

      </div>
    </div>
  );
};

export default JobLogsPage;
