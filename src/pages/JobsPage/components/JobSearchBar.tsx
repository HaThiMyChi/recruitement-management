import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Form, InputGroup } from "react-bootstrap"

const JobSearchBar: React.FC = () => {
    return (
        <Form>
            <InputGroup className="mb-3">
                <Form.Control 
                    placeholder="Search for jobs by title, description, or keywords..."
                    
                    aria-label="Search jobs"
                />
                <Button variant="primary" type="submit">
                    <FontAwesomeIcon icon={faSearch} />Search
                </Button>
            </InputGroup>
        </Form>
    )
}

export default JobSearchBar;