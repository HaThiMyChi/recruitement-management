
import React, { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import ApplicationsHeader from "./components/ApplicationsHeader";
import ApplicationsTable from "./components/ApplicationsTable";
import { useNavigate } from "react-router-dom";
import { ApplicationSummary, FetchApplicationsParams, PaginatedApplicationsResponse, PaginationMeta, UpdateApplicationStatusParams } from "../../types/applicationTypes";
import { deleteApplication, deleteMultipleApplications, fetchApplications, updateApplicationStatus } from "../../services/applicationService";
import ApplicationsPagination from "./components/ApplicationsPagination";
import ErrorMessage from "../../components/shared/ErrorMessage";
import SuccessMessage from "../../components/shared/SuccessMessage";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import StatusChangeModal from "./components/StatusChangeModal";
import ConfirmationModal from "../../components/shared/ConfirmationModal";
import BulkActions from "./components/BulkActions";
import ApplicationDetailModal from "./components/ApplicationDetailModal";

interface ApplicationsPageProps {
    onSelectApplication?: (applicationId: number) => void;
}

const ApplicationsPage: React.FC<ApplicationsPageProps> = ({onSelectApplication }) => {

    const navigate = useNavigate();
    const [applicationsData, setApplicationsData] = useState<PaginatedApplicationsResponse | null>(null);
    const  [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedApplicationIds, setSelectedApplicationIds] = useState<number[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [applicationToUpdateStatus, setApplicationToUpdateStatus] = useState<number | null>(null);
    const [statusChangeModalOpen, setStatusChangeModalOpen] = useState<boolean>(false);
    const [applicationToDelete, setApplicationToDelete] = useState<number | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState<boolean>(false);

    const [selectedApplicationId, setSelectedApplicationId] = useState<number | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    // Use a ref to store selectedApplicationIds to access current value without creating dependencies
    const selectedApplicationIdsRef = useRef<number[]>([]);

    // Update the ref whenever selectedApplicationIds changes
    useEffect(() => {
        selectedApplicationIdsRef.current = selectedApplicationIds;
    }, [selectedApplicationIds]);

    const [filters, setFilters] = React.useState({
        page: 1,
        limit: 10,
        jobId: '',
        userId: '',
        status: '',
        fromDate: '',
        toDate: ''
    });

    const loadApplications = useCallback(async (currentFilters: FetchApplicationsParams) => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const data = await fetchApplications(currentFilters);
            setApplicationsData(data);

            // Use the ref to get current selected IDs without creating a dependency
            const currentSelectedIds = selectedApplicationIdsRef.current;
            console.log('currentSelectedIds', currentSelectedIds)
            if (currentSelectedIds.length > 0) {
                const existingIds = data.data.map(app => app.id);
                console.log('existingIds', existingIds)
                const filteredIds = currentSelectedIds.filter(id => existingIds.includes(id));
                console.log('filteredIds', filteredIds)
                if (filteredIds.length !== currentSelectedIds.length) {
                    setSelectedApplicationIds(filteredIds);
                }
            }   
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadApplications(filters)
    }, [loadApplications, filters]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLElement>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        const {name, value} = target;

        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleFilterSubmit = (e: FormEvent) => {
        e.preventDefault();
        setFilters(prevFilters => ({...prevFilters, page: 1}))
    }

    const handleApplicationClick = (applicationId: number) => {
        setSelectedApplicationId(applicationId);
        setShowDetailModal(true);

    }

    const handleCheckboxChange = (applicationId: number, checked: boolean) => {
        if (checked) {
            setSelectedApplicationIds(prev => [...prev, applicationId]);
        } else {
            setSelectedApplicationIds(prev => prev.filter(id => id !== applicationId));
        }
    }

    const handleDeleteClick = (applicationId: number) => {
        setApplicationToDelete(applicationId);
        setDeleteModalOpen(true);
    }

    const handleStatusChangeClick = (applicationId: number) => {
        console.log('handleStatusChangeClick', applicationId)
        setApplicationToUpdateStatus(applicationId);
        setStatusChangeModalOpen(true);
    }

    const handlePageChange = (page: number) => {
        setFilters(prev  => ({
            ...prev,
            page
        }));
    }

    const handleStatusChangeSubmit = async(statusData: UpdateApplicationStatusParams) => {
        console.log('handleStatusChangeSubmit', statusData)
        if (applicationToUpdateStatus === null) return;

        setLoading(false);
        setError(null);

        try {
            await updateApplicationStatus(applicationToUpdateStatus, statusData);
            setSuccessMessage(`Application #${applicationToUpdateStatus} status was successfully updated to ${statusData.status}.`);

            // Refresh the data
            await loadApplications(filters);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
               setError('An unexpected error occurred while updating the application status.'); 
            }
        } finally {
            setLoading(false);
            setStatusChangeModalOpen(false);
            setApplicationToUpdateStatus(null);
        }
    }

    const handleDeleteConfirm = async () => {
        if (applicationToDelete === null) return;

        setLoading(true);
        setError(null);

        try {
            await deleteApplication(applicationToDelete);
            setSuccessMessage(`Application #${applicationToDelete} was successfully deleted.`);

            // Remove from selected IDs if it was selected
            console.log('selectedApplicationIds', selectedApplicationIds)
            setSelectedApplicationIds(prev => prev.filter(id => id !== applicationToDelete));

            // Refresh the data
            await loadApplications(filters);
        } catch(err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred while deleting the application.')
            }
        } finally {
            setLoading(false);
            setDeleteModalOpen(false);
            setApplicationToDelete(null);
        }
    }

    const handleClearSelection = () => {
        setSelectedApplicationIds([]);
    }

    const handleBulkDeleteClick = () => {
        if (selectedApplicationIds.length === 0) return;
        setBulkDeleteModalOpen(true);
    }

    const handleBulkDeleteConfirm  = async () => {
        if (selectedApplicationIds.length === 0) return;

        setLoading(true);
        setError(null);

        try {
            const result = await deleteMultipleApplications(selectedApplicationIds);

            // Show success message with details
            setSuccessMessage(`Successfully deleted ${result.deleted} application(s).${
                result.failed.length > 0 ? `Failed to delete ${result.failed.length} application(s).` : ''
            }`);

            // clear selection
            setSelectedApplicationIds([]);

            // refresh load data
            await loadApplications(filters);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('An unexpected error occurred while deleting applications.');
            }
        } finally {
            setLoading(false);
            setBulkDeleteModalOpen(false);
        }

    }

    const applications: ApplicationSummary[] = applicationsData?.data || [];
    const meta: PaginationMeta | undefined = applicationsData?.meta;

    return (
        <div className="main_content">
            <div style={{
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
            }}>
                <ApplicationsHeader 
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onFilterSubmit={handleFilterSubmit}
                />

                {error && <ErrorMessage message={error}></ErrorMessage>}

                {successMessage && <SuccessMessage message={successMessage} />}

                <BulkActions 
                    selectedCount={selectedApplicationIds.length}
                    onDeleteSelected={handleBulkDeleteClick}
                    onClearSelection={handleClearSelection}
                />
                
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <ApplicationsTable 
                            applications={applications}
                            onSelectApplication={handleApplicationClick}
                            selectedApplicationIds={selectedApplicationIds}
                            onCheckboxChange={handleCheckboxChange}
                            onDeleteApplication={handleDeleteClick}
                            onChangeStatus={handleStatusChangeClick}

                        />
                        <ApplicationsPagination meta={meta} onPageChange={handlePageChange} />
                    </>
                )}

                <ConfirmationModal
                    isOpen={deleteModalOpen}
                    title={"Delete Application"}
                    message={
                        `Are you sure you want to delete application #${applicationToDelete}? This action cannot be undone.`
                    }
                    confirmText="Delete"
                    cancelText="Cancel"
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteModalOpen(false)}
                />

                <ConfirmationModal
                    isOpen={bulkDeleteModalOpen}
                    title="Delete Multiple Applications"
                    message={`Are you sure you want to delete ${selectedApplicationIds.length} application(s)? This action cannot be undone.`}
                    confirmText="Delete All"
                    cancelText="Cancel"
                    onConfirm={handleBulkDeleteConfirm}
                    onCancel={() => setBulkDeleteModalOpen(false)}
                />

                <StatusChangeModal 
                    isOpen={statusChangeModalOpen}
                    applicationId={applicationToUpdateStatus}
                    onSubmit={handleStatusChangeSubmit}
                    onCancel={() => setStatusChangeModalOpen(false)}
                />

                <ApplicationDetailModal 
                    show={showDetailModal}
                    applicationId={selectedApplicationId}
                    onHide={() => setShowDetailModal(false)}
                />
            </div>
        </div>
    )
}

export default ApplicationsPage;