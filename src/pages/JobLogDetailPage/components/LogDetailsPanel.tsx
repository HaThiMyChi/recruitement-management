interface LogDetailsPanelProps {
    details: string;
}

const LogDetailsPanel: React.FC<LogDetailsPanelProps> = ({details}) => {
    return (
        <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{marginTop: 0}}>Change Details</h3>
            <div style={{
                padding: '15px',
                backgroundColor: 'white',
                borderRadius: '4px',
                border: '1px solid #ddd',
                whiteSpace: 'pre-wrap',
                minHeight: '150px'
            }}>
                {details || 'No details provided for this log entry.'}</div>
        </div>
    )
}

export default LogDetailsPanel;