import React from "react";

interface BulkActionsProps {
    selectedCount: number;
    onDeleteSelected: () => void;
    onClearSelection: () => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({ selectedCount, onDeleteSelected, onClearSelection}) => {
    if (selectedCount === 0) {
        return null;
    }

    return (
        <div>
            <span style={{marginRight: '15px'}}>
                <strong>{selectedCount}</strong> item{selectedCount !== 1 ? 's' : ''} selected
            </span>
            <button
                onClick={onDeleteSelected}
                style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 10px',
                    marginRight: '10px',
                    cursor: 'pointer'
                }}
            >
                Delete Selected
            </button>
            <button
                onClick={onClearSelection}
                style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #6c757d',
                    borderRadius: '4px',
                    padding: '5px 10px',
                    cursor: 'pointer'
                }}
            >
                Clear Selection
            </button>
        </div>
    )
}

export default BulkActions;