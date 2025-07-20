import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const UserInfoComponent: React.FunctionComponent = () => {
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center" style={{padding: '20px'}}>
                <Card style={{width: '1000px', padding: '20px'}}>
                    <Card.Body>
                        <div className="infomation-card" style={{display: 'flex', justifyContent: 'flex-start', gap: '20px'}}>
                            <img style={{ width: '88px', height: '88px' }} src="https://c.topdevvn.com/v4/_next/static/media/no-avatar.6db79731.svg"></img>
                            <p style={{display: 'flex', alignItems: 'center'}}>NAME</p>
                        </div>

                        <Form>
                            <Form.Group as={Row} className="mb-3">
                                <Col>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Col>
                                <Col>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Phone"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Col>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Full Name"
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Enter Address">
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col>
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Company Name"></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label>Company Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Company Address"></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col>
                                    <Form.Label>Company Size</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Company Size"></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label>Company Website</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Company Website"></Form.Control>
                                </Col>
                            </Form.Group>
                            <div style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
                                <Button variant="primary" type="submit">Save Changes</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default UserInfoComponent;