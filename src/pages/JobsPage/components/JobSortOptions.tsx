import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { GetListJobs } from "../../../app/slices/jobs.slice";

const JobSortOptions: React.FC = () => {
    const dispatch = useDispatch();
    const {sortBy, sortOrder} = useSelector((state: RootState) => state.jobs.filters);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [newSortBy, newSortOrder] = e.target.value.split('-');

        dispatch(GetListJobs({
            sortBy: newSortBy,
            sortOrder: newSortOrder as 'asc' | 'desc'
        }));
    };

    const currentValue = `${sortBy || 'createdAt'}-${sortOrder || 'desc'}`;

    return (
        <Form.Select
            style={{width: 'auto'}}
            aria-label="Sort jobs"
            value={currentValue}
            onChange={handleSortChange}
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