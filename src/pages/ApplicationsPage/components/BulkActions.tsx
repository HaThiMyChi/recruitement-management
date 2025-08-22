import { Button, ButtonGroup, Col, Row } from "react-bootstrap";

interface BulkActionsProps {
    selectedCount: number;
    onDeleteSelected: () => void;
    onClearSelection: () => void;
}


const BulkActions : React.FC<BulkActionsProps> = ({
    selectedCount,
    onDeleteSelected,
    onClearSelection
}) => {
    if (selectedCount === 0) {
        return null;
    }

    return (
        <Row className="mb-3">
            <Col>
                <div data-testid="bulk-actions" className="bg-light p-3 rounded d-flex justify-content-between align-items-center">
                    <div>
                        <strong>{selectedCount}</strong> application{selectedCount !== 1 ? 's' : ''} selected
                    </div>
                    <ButtonGroup>
                        <Button
                            data-testid="bulk-delete-button"
                            variant="danger"
                            size="sm"
                            onClick={onDeleteSelected}>Delete Selected
                        </Button>
                        <Button 
                            data-testid="clear-selection-button"
                            variant="outline-secondary" 
                            size="sm" 
                            onClick={onClearSelection}
                        >
                            Clear Selection
                        </Button>
                    </ButtonGroup>
                </div>
            </Col>
        </Row>
    )

};

export default BulkActions;