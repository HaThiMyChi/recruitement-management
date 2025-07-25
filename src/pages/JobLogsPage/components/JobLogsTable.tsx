import { JobLogSummary } from "../../../app/types/jobLogTypes";

interface JobLogsTableProps {
    logs: JobLogSummary[];
    onSelectJobLog: (logId: number) => void;
    selectedLogIds: number[];
    onCheckboxChange: (logId: number, checked: boolean) => void;
    onDeleteLog: (logId: number) => void;
}


const JobLogsTable: React.FC<JobLogsTableProps> = ({
    logs, 
    onSelectJobLog, 
    selectedLogIds,
    onCheckboxChange,
    onDeleteLog

}) => {
    if (logs.length === 0) {
        return <p>No job logs found for the current filters.</p>
    }

    const handleRowClick = (logId: number, e: React.MouseEvent) => {
        console.log('e target', e.target)
        // Prevent row click when clicking on checkbox and delete button
        if ((e.target as HTMLElement).tagName === 'INPUT' ||
            (e.target as HTMLElement).tagName === 'BUTTON' ||
            (e.target as HTMLElement).closest('button')) {
            return;
        }
        onSelectJobLog(logId);    
    }
    

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, logId: number) => {
        onCheckboxChange(logId, e.target.checked);
        e.stopPropagation();
    }

    const handleDeleteClick = (e: React.MouseEvent, logId: number) => {
        console.log('handleDeleteClick', handleDeleteClick)
        e.stopPropagation();
        onDeleteLog(logId);
    }

    return (
        <table style={{width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
            <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}> 
                    <th style={tableHeaderStyle}>
                        <input 
                        type="checkbox"
                        onChange={(e) => {
                            const isChecked = e.target.checked;
                            logs.forEach(log => onCheckboxChange(log.id, isChecked));
                        }}
                        checked={logs.length > 0 && selectedLogIds.length === logs.length}
                        style={{cursor: 'pointer'}}
                    />
                    </th>
                    <th style={tableHeaderStyle}>Log ID</th>
                    <th style={tableHeaderStyle}>Job Title</th>
                    <th style={tableHeaderStyle}>User Name</th>
                    <th style={tableHeaderStyle}>Action</th>
                    <th style={tableHeaderStyle}>Timestamp</th>
                    <th style={tableHeaderStyle}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {logs.map(log => (
                    <tr
                        key={log.id}
                        style={{
                            borderBottom: '1px solid #eee',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            backgroundColor: selectedLogIds.includes(log.id) ? '#f0f7ff' : 'transparent'

                        }}
                        onClick={(e) => handleRowClick(log.id, e)}
                        onMouseOver={(e) => {
                            if (!selectedLogIds.includes(log.id)) {
                                e.currentTarget.style.backgroundColor = '#f5f5f5'
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!selectedLogIds.includes(log.id)) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }
                        }}
                    >
                        <td style={tableCellStyle}>
                            <input 
                                type="checkbox"
                                checked={selectedLogIds.includes(log.id)}
                                onChange={(e) => handleCheckboxChange(e, log.id)}
                                style={{cursor: 'pointer'}}
                            />
                        </td>
                        <td style={tableCellStyle}>{log.id}</td>
                        <td style={tableCellStyle}>{log.jobTitle}</td>
                        <td style={tableCellStyle}>{log.userName}</td>
                        <td style={tableCellStyle}>{log.action.replace(/_/g, ' ').toUpperCase()}</td>
                        <td style={tableCellStyle}>{new Date(log.createdAt).toLocaleString()}</td>
                        <td style={tableCellStyle}>
                            <button
                                onClick={(e) => handleDeleteClick(e, log.id)}
                                style={{ 
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '5px 10px',
                                    cursor: 'pointer'
                                }}
                            >Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};

const tableHeaderStyle: React.CSSProperties = {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '2px solid #dee2e6',
    fontWeight: 'bold'
};

const tableCellStyle: React.CSSProperties = {
    padding: '12px 15px',
    textAlign: 'left'
};

export default JobLogsTable