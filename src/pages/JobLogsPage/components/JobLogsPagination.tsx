import { PaginationMeta } from "../../../app/types/jobLogTypes";

interface JobLogsPaginationProps {
    meta?: PaginationMeta;
    onPageChange: (newPage: number) => void
}

const JobLogsPagination: React.FC<JobLogsPaginationProps> = ({meta, onPageChange}) => {
    if (!meta) return null;

    return (
        <div style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <button
                onClick={() => onPageChange(meta.currentPage - 1)}
                disabled={meta.currentPage <=1}
                style={{
                    ...paginationButtonStyle,
                    opacity: meta.currentPage <= 1 ? 0.5 : 1,
                    cursor: meta.currentPage <= 1 ? 'not-allowed' : 'pointer'
                }}
            >
                Previous
            </button>
            <span>Page {meta.currentPage} of {meta.totalPages} (Total: {meta.totalItems})</span>
            <button
                onClick={() => onPageChange(meta.currentPage + 1)}
                disabled={meta.currentPage >= meta.totalPages}
                style={{
                    ...paginationButtonStyle,
                    opacity: meta.currentPage >= meta.totalPages ? 0.5 : 1,
                    cursor: meta.currentPage >= meta.totalPages ? 'not-allowed' : 'pointer'
                }}  
            >
                Next
            </button>
        </div>
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

