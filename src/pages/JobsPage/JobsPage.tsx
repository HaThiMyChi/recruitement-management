import { Col, Container, Row } from "react-bootstrap"
import JobSearchBar from "./components/JobSearchBar";
import JobFilters from "./components/JobFilters";
import JobSortOptions from "./components/JobSortOptions";
import JobList from "./components/JobList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import { GetListJobs } from "../../app/slices/jobs.slice";

const JobListPage: React.FC = () => {
    const dispatch = useDispatch();
    const {jobs, isLoading, error, meta, filters} = useSelector((state: RootState) => state.jobs);

    useEffect(() => {
        dispatch(GetListJobs(filters));
    }, [dispatch]);
    
    return (
        <Container className="py-4">
            <h1 className="mb-4">Job Listings</h1>

            <Row className="mb-4">
                <Col md={12}>
                    <JobSearchBar />
                </Col>
            </Row>

            <Row>
                <Col md={3}>
                    <JobFilters />
                </Col>

                <Col md={9}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            {meta && (
                                <p className="text-muted mb-0">
                                    Show {jobs.length} of {meta.totalItems} jobs
                                </p>
                            )}
                        </div>
                        <JobSortOptions />
                    </div>

                    {error && <div className="alert alert-danger">{error.message}</div>}
                        
                    <JobList jobs={jobs} isLoading={isLoading}/>
                </Col>
            </Row>
        </Container>
    )
}

export default JobListPage;