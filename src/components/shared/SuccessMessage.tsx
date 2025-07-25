import React from "react";
import { Alert } from "react-bootstrap";

interface SuccessMessageProps {
    message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({message}) => {
    return (
        <Alert variant="success" className="mb-4">
            <Alert.Heading>Success</Alert.Heading>
            <p>{message}</p>
        </Alert>
    );
};

export default SuccessMessage;