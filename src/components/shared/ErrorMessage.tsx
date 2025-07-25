import React from "react";
import { Alert } from "react-bootstrap";

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => {
    return (
        <Alert variant="danger" className="mb-4">
            <Alert.Heading>Error</Alert.Heading>
            <p>{message}</p>
        </Alert>
    );
};

export default ErrorMessage;