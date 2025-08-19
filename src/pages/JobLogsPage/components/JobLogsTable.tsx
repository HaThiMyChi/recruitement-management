import { Badge, Button, Form, Table } from "react-bootstrap";
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
        <Table hover bordered responsive className="shadow-sm">
            <thead className="bg-light">
                <tr> 
                    <th className="align-middle">
                        <Form.Check 
                        type="checkbox"
                        onChange={(e) => {
                            const isChecked = e.target.checked;
                            logs.forEach(log => onCheckboxChange(log.id, isChecked));
                        }}
                        checked={logs.length > 0 && selectedLogIds.length === logs.length}
                    />
                    </th>
                    <th className="align-middle">Log ID</th>
                    <th className="align-middle">Job Title</th>
                    <th className="align-middle">User Name</th>
                    <th className="align-middle">Action</th>
                    <th className="align-middle">Timestamp</th>
                    <th className="align-middle">Actions</th>
                </tr>
            </thead>
            <tbody>
                {logs.map(log => (
                    <tr
                        key={log.id}
                        className={selectedLogIds.includes(log.id) ? 'bg-light-blue' : ''}
                        onClick={(e) => handleRowClick(log.id, e)}
                    >
                        <td>
                            <Form.Check 
                                type="checkbox"
                                checked={selectedLogIds.includes(log.id)}
                                onChange={(e) => handleCheckboxChange(e, log.id)}
                            />
                        </td>
                        <td>{log.id}</td>
                        <td>{log.jobTitle}</td>
                        <td>{log.userName}</td>
                        <td>
                            <Badge bg="secondary">
                                {log.action.replace(/_/g, ' ').toUpperCase()}
                            </Badge>
                        </td>
                        <td>{new Date(log.createdAt).toLocaleString()}</td>
                        <td>
                            <Button
                                onClick={(e) => handleDeleteClick(e, log.id)}
                                size="sm"
                                variant="danger"
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
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