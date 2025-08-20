import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Pagination } from "react-bootstrap";
import { GetListJobs } from "../../../app/slices/jobs.slice";

interface JobPaginationProps {
    currentPage: number;
    totalPages: number;
}

const JobPagination: React.FC<JobPaginationProps> = ({currentPage, totalPages}) => {
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.jobs.filters);
    
    const handlePageChange = (page: number) => {
        dispatch(GetListJobs({...filters, page}));
        window.scrollTo(0, 0);
    }

    // Helper to determine which page items to show
    const getPageItems = () => {
        const items = [];
        const maxItems = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxItems / 2));
        const endPage = Math.min(totalPages, startPage + maxItems - 1);

        // Adjust start page if necessary
        startPage = Math.max(1, endPage - maxItems + 1);

        // Frist page
        if (startPage > 1) {
            items.push(
                <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
                    1
                </Pagination.Item>
            );

            if (startPage > 2) {
                items.push(<Pagination.Ellipsis key="ellipsis1" disabled />);
            }
        }

        // Page number
        for (let page = startPage; page <= endPage; page++) {
            items.push(
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => page !== currentPage && handlePageChange(page)}>
                    {page}
                </Pagination.Item>
            )
        }

        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                items.push(<Pagination.Ellipsis key="ellipsis2" disabled />)
            }
            items.push(
                <Pagination.Item key={totalPages} onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                </Pagination.Item>
            )
        }

        return items;
    }

    return (
        <div className="d-flex justify-content-center mt-4">
            <Pagination>
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {getPageItems()}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </div>
    )
}

export default JobPagination;