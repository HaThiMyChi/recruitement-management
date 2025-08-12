import { Pagination, Row } from "react-bootstrap";
import { PaginationMeta } from "../../../types/applicationTypes"

interface ApplicationsPaginationProps {
    meta?: PaginationMeta;
    onPageChange: (page: number) => void;
}

const ApplicationsPagination: React.FC<ApplicationsPaginationProps> = ({meta, onPageChange}) => {
    if (!meta || meta.totalPages < 1) {
        return null
    }

    // Create a reasonable number of page items
    const createPaginationItems = () => {
        const items = [];
        const currentPage = meta.currentPage;
        const totalPages = meta.totalPages;

        // Always show first page
        items.push(
            <Pagination.Item key={1} active={currentPage === 1} onClick={() => onPageChange(1)}>
                1
            </Pagination.Item>
        );

        // Show ellipsis if there are many pages before current
        if (currentPage > 3) {
            items.push(<Pagination.Ellipsis key="ellipsis-1" />);
        }

        // Show pages arount current
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            if (i > 1 && i <totalPages) {
                items.push(
                    <Pagination.Item 
                        key={i} 
                        active={i === currentPage}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </Pagination.Item>
                )
            }
        }

        // Show ellipsis if there are many pages after current
        if (currentPage < totalPages - 2) {
            items.push(<Pagination.Ellipsis key="ellipsis-2" />);
        }

        // Always show last page if more than 1 page
        if (totalPages > 1) {
            items.push(
                <Pagination.Item 
                key={totalPages} 
                active={currentPage === totalPages}
                onClick={() => onPageChange(totalPages)}
                >
                {totalPages}
                </Pagination.Item>
            );
        }
        return items;
    };

    return (
        <Row className="d-flex justify-content-between align-items-center">
            <div>
                Showing {(meta.currentPage - 1) * meta.itemsPerPage + 1} to {Math.min(meta.currentPage * meta.itemsPerPage, meta.totalItems)} of {meta.totalItems} applications
            </div>

            <Pagination>
                <Pagination.Prev
                    disabled={meta.currentPage <= 1}
                    onClick={() => onPageChange(meta.currentPage - 1)}
                />

                {createPaginationItems()}
                <Pagination.Next 
                    disabled={meta.currentPage >= meta.totalPages}
                    onClick={() => onPageChange(meta.currentPage + 1)}/>
            </Pagination>
        </Row>
    )
}

export default ApplicationsPagination;