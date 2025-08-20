import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Form, InputGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { useState } from "react"
import { GetListJobs } from "../../../app/slices/jobs.slice"

const JobSearchBar: React.FC = () => {
    const dispatch = useDispatch();
    const currentSearch = useSelector((state: RootState) => state.jobs.filters.q || '');

    const [searchTerm, setSearchTerm] = useState(currentSearch);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(GetListJobs({
            q: searchTerm.trim() || undefined,
            page: 1
        }));
    }

    return (
        <Form onSubmit={handleSearch}>
            <InputGroup className="mb-3">
                <Form.Control 
                    placeholder="Search for jobs by title, description, or keywords..."
                    value={searchTerm}
                    aria-label="Search jobs"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary" type="submit">
                    <FontAwesomeIcon icon={faSearch} />Search
                </Button>
            </InputGroup>
        </Form>
    )
}

export default JobSearchBar;