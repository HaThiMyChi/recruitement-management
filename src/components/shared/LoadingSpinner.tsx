import React from "react";
import { Spinner, Container } from "react-bootstrap";

const LoadingSpinner: React.FC = () => {
    return (
        <Container className="d-flex flex-column align-items-center justify-content-center p-4">
            <Spinner 
                animation="border"
                variant="primary" 
                role="status"
                style={{width: '3rem', height: '3rem'}}
                className="mb-3"
            />
            <span>Loading...</span>
        </Container>
    );
};

export default LoadingSpinner;