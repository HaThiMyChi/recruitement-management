import React, { FormEvent } from "react";
import { FetchJobLogsParams } from "../../../app/types/jobLogTypes"
import { JobLogAction } from "../../../enums/JobLogAction";

interface JobLogsHeaderProps {
    filters: FetchJobLogsParams;
    onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onFilterSubmit: (e: FormEvent) => void
}

const JobLogsHeader: React.FC<JobLogsHeaderProps> = ({
    filters,
    onFilterChange,
    onFilterSubmit
}) => {
    return (
        <div>
            <h1>Job Logs</h1>

            <form onSubmit={onFilterSubmit} style={{
                marginBottom: '20px',
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}>
                <input 
                    type="text"
                    name="jobId"
                    placeholder="Filter by Job ID"
                    value={filters.jobId || ''}
                    onChange={onFilterChange}
                    style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        minWidth: '150px'
                    }}
                /> 
                <input 
                    type="text"
                    name="userId"
                    placeholder="Filter by User ID"
                    value={filters.userId || ''}
                    onChange={onFilterChange}
                    style={{
                        padding: '8px', 
                        borderRadius: '4px', 
                        border: '1px solid #ccc',
                        minWidth: '150px' 
                    }}
                />
                <select 
                    name="action" 
                    value={filters.action || ''}
                    onChange={onFilterChange}
                    style={{
                        padding: '8px', 
                        borderRadius: '4px', 
                        border: '1px solid #ccc',
                        minWidth: '150px' 
                    }}
                >
                    <option value="">All Actions</option>
                    {Object.values(JobLogAction).map(actionValue => (
                        <option key={actionValue} value={actionValue}>
                            {/* Tìm tất cả dấu gạch dưới _ trong chuỗi (regex /_/g là “tất cả dấu _”) thay thành  ' ' */}
                            {actionValue.replace(/_/g, ' ').toUpperCase()} 
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    style={{
                        padding: '8px 15px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#007bff',
                        color: 'white',
                        cursor: "pointer"
                    }}
                >
                    Apply Filters
                </button>
            </form>
        </div>
    )
}

export default JobLogsHeader;