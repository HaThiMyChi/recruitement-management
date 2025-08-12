
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import ApplicationsHeader from "./components/ApplicationsHeader";
import ApplicationsTable from "./components/ApplicationsTable";
import { useNavigate } from "react-router-dom";
import { ApplicationSummary, FetchApplicationsParams, PaginatedApplicationsResponse, PaginationMeta } from "../../types/applicationTypes";
import { fetchApplications } from "../../services/applicationService";
import ApplicationsPagination from "./components/ApplicationsPagination";
import ErrorMessage from "../../components/shared/ErrorMessage";
import SuccessMessage from "../../components/shared/SuccessMessage";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

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

    const handleApplicationClick = () => {

    }

    const handleCheckboxChange = () => {

    }

    const handleDeleteClick = (applicationId: number) => {
    }

    const handleStatusChangeClick = (applicationId: number) => {
    }

    const handlePageChange = (page: number) => {
        setFilters(prev  => ({
            ...prev,
            page
        }));
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
            </div>
        </div>
    )
}

export default ApplicationsPage;