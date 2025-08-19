import { Form } from "react-bootstrap";

const JobSortOptions: React.FC = () => {
    return (
        <Form.Select
            style={{width: 'auto'}}
            aria-label="Sort jobs"
        >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="minSalary-desc">Highest Salary</option>
            <option value="minSalary-asc">Lowest Salary</option>
        </Form.Select>
    )
}

export default JobSortOptions;