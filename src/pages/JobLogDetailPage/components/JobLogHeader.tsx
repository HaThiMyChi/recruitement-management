import React from 'react';
import { useNavigate } from "react-router-dom"

const JobLogHeader: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            padding: '10px 0',
            borderBottom: '1px solid #eee'
        }}>
            <h1 style={{margin: 0}}>Job Log Details</h1>
            <button
                onClick={() => navigate('/admin/job-logs')}
                style={{
                    padding: '8px 15px',
                    borderRadius: '4px',
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                }}
            >
                <span>Back to Job Logs</span> 
            </button>
        </div>
    )
}

export default JobLogHeader;
