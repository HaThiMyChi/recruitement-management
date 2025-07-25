import { JobLogAction } from "../../../enums/JobLogAction";

interface ActionBadgeProps {
    action: JobLogAction;
}

const ActionBadge: React.FC<ActionBadgeProps> = ({action}) => {
    return (
        <span style={{
            display: 'inline-block',
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: getActionColor(action),
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.85rem'
        }}>
            {action}
        </span>
    );
};

// Helper function to get background color for action badges
const getActionColor = (action: JobLogAction): string => {
    switch (action) {
        case JobLogAction.CREATE:
            return '#4caf50'; // Green
        case JobLogAction.UPDATE:
            return '#2196f3'; // Blue
        case JobLogAction.ACTIVATE:
            return '#ff9800'; // Orange
        case JobLogAction.DELETE:
            return '#f44336'; // Red
        default:
            return '#757575'; // Grey

    };

};

export default ActionBadge;