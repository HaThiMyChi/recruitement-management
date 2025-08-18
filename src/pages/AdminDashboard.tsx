import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBriefcase, faFileAlt, faClipboard } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="mb-4">Admin Dashboard</h1>
      
      <Row>
        <Col md={6} lg={3} className="mb-4">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <FontAwesomeIcon icon={faUsers} size="3x" className="mb-3 text-primary" />
              <Card.Title>Users</Card.Title>
              <h2>250</h2>
              <Card.Text>Total registered users</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-4">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <FontAwesomeIcon icon={faBriefcase} size="3x" className="mb-3 text-success" />
              <Card.Title>Jobs</Card.Title>
              <h2>58</h2>
              <Card.Text>Active job listings</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-4">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <FontAwesomeIcon icon={faClipboard} size="3x" className="mb-3 text-info" />
              <Card.Title>Applications</Card.Title>
              <h2>124</h2>
              <Card.Text>Total job applications</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-4">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <FontAwesomeIcon icon={faFileAlt} size="3x" className="mb-3 text-warning" />
              <Card.Title>Job Logs</Card.Title>
              <h2>347</h2>
              <Card.Text>System activities</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* You can add more dashboard components here */}
    </div>
  );
};

export default AdminDashboard;
