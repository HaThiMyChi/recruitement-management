
import React, { useCallback, useEffect, useState } from "react";
import ApplicationsHeader from "./components/ApplicationsHeader";
import ApplicationsTable from "./components/ApplicationsTable";
import { useNavigate } from "react-router-dom";
import { ApplicationSummary, FetchApplicationsParams, PaginatedApplicationsResponse, PaginationMeta } from "../../types/applicationTypes";
import { fetchApplications } from "../../services/applicationService";

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

    const handleFilterChange = () => {

    }

    const handleFilterSubmit = () => {

    }

    const handleApplicationClick = () => {

    }

    const handleCheckboxChange = () => {

    }

    const handleDeleteClick = (applicationId: number) => {
    }

    const handleStatusChangeClick = (applicationId: number) => {
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

                <>
                    <ApplicationsTable 
                        applications={applications}
                        onSelectApplication={handleApplicationClick}
                        selectedApplicationIds={selectedApplicationIds}
                        onCheckboxChange={handleCheckboxChange}
                        onDeleteApplication={handleDeleteClick}
                        onChangeStatus={handleStatusChangeClick}

                    />
                </>
            </div>
        </div>
    )
}

export default ApplicationsPage;