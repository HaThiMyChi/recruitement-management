import { Col, Pagination, Row } from "react-bootstrap";
import { PaginationMeta } from "../../../app/types/jobLogTypes";

interface JobLogsPaginationProps {
    meta?: PaginationMeta;
    onPageChange: (newPage: number) => void
}

const JobLogsPagination: React.FC<JobLogsPaginationProps> = ({meta, onPageChange}) => {
    if (!meta) return null;

    return (
        <Row className="mt-4 align-items-center">
            <Col xs={4}>
                <Pagination>
                    <Pagination.Prev 
                        onClick={() => onPageChange(meta.currentPage - 1)}
                        disabled={meta.currentPage <=1}
                    />
                </Pagination>
            </Col>
            
            <Col xs={4} className="text-center">
                <span>Page {meta.currentPage} of {meta.totalPages} (Total: {meta.totalItems}) </span>
            </Col>

            <Col xs={4} className="d-flex justify-content-end">
                <Pagination>
                    <Pagination.Next 
                        onClick={() => onPageChange(meta.currentPage + 1)}
                        disabled={meta.currentPage >= meta.totalPages}
                    />
                </Pagination>
            </Col>
        </Row>
    )
};

const paginationButtonStyle: React.CSSProperties = {
    padding: '8px 15px',
    borderRadius: '4px',
    border: '1px solid #007bff',
    backgroundColor: 'white',
    color: '#007bff',
    cursor: 'pointer',

}

export default JobLogsPagination;

