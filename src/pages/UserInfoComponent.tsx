import { FormEvent, useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser, resetUpdateUserState, updateUser } from "../app/slices/user.slice"
import { RootState } from "../app/store"
import { toast } from "react-toastify"
import { UserInfo, UserRequestUpdate } from "../app/types/user.type"

const UserInfoComponent: React.FunctionComponent = () => {
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const response = useSelector((state: RootState) => state.user)
    const user = response.data
    const status = response.status
    const [userUpdate, setUserUpdate] = useState<UserInfo | null>(user)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e?.target
        setUserUpdate((prev) => {
            if (!prev) return prev
            return {
                ...prev,
                [name]: value
            }
        })
    };
    const handleUpdateUser = (e: FormEvent) => {
        e.preventDefault()
        if (!userUpdate) {
            console.log('return')
            return;
        }

        const userReq: UserRequestUpdate = {
            id: userUpdate.id,
            email: userUpdate.email,
            fullName: userUpdate.fullName,
            phone: userUpdate.phone,
            address: userUpdate.address,
            companyName: userUpdate.companyName,
            companyAddress: userUpdate.companyAddress,
            companySize: userUpdate.companySize,
            companyWebsite: userUpdate.companyWebsite
        }

        dispatch(updateUser(userReq))
        setShow(false)
    }
    useEffect(() => {
        dispatch(getCurrentUser())
    }, [dispatch])
    useEffect(() => {
        setUserUpdate(user)
    }, [user])
    useEffect(() => {
        if (status === 200) {
            toast.success('Update User Success!!!')
            dispatch(resetUpdateUserState(userUpdate));
        }
    })
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center" style={{ padding: '20px' }}>
                <Card style={{ width: '1000px', padding: '20px' }}>
                    <Card.Body>
                        <div className="infomation-card" style={{ display: 'flex', justifyContent: 'flex-start', gap: '20px' }}>
                            <img style={{ width: '88px', height: '88px' }} src="https://c.topdevvn.com/v4/_next/static/media/no-avatar.6db79731.svg"></img>
                            <p style={{ display: 'flex', alignItems: 'center' }}>{user?.fullName}</p>
                        </div>
                        {/* {error && <Alert variant="danger">{error}</Alert>} */}
                        <Form>
                            <Form.Group as={Row} className="mb-3">
                                <Col>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        name="email"
                                        type="email"
                                        placeholder="Enter email"
                                        value={userUpdate?.email}
                                        onChange={handleChangeUser}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        name="phone"
                                        type="text"
                                        placeholder="Enter Phone"
                                        value={userUpdate?.phone}
                                        onChange={handleChangeUser}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Col>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        name="fullName"
                                        type="text"
                                        placeholder="Enter Full Name"
                                        value={userUpdate?.fullName}
                                        onChange={handleChangeUser}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text"
                                        name="address"
                                        placeholder="Enter Address"
                                        value={userUpdate?.address}
                                        onChange={handleChangeUser}>

                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col>
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control
                                        name="companyName"
                                        type="text"
                                        placeholder="Enter Company Name"
                                        value={userUpdate?.companyName}
                                        onChange={handleChangeUser}></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label>Company Address</Form.Label>
                                    <Form.Control
                                        name="companyAddress"
                                        type="text"
                                        placeholder="Enter Company Address"
                                        value={userUpdate?.companyAddress}
                                        onChange={handleChangeUser}></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col>
                                    <Form.Label>Company Size</Form.Label>
                                    <Form.Control
                                        name="companySize"
                                        type="text"
                                        placeholder="Enter Company Size"
                                        value={userUpdate?.companySize}
                                        onChange={handleChangeUser}></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label>Company Website</Form.Label>
                                    <Form.Control
                                        name="companyWebsite"
                                        type="text"
                                        placeholder="Enter Company Website"
                                        value={userUpdate?.companyWebsite}
                                        onChange={handleChangeUser}></Form.Control>
                                </Col>
                            </Form.Group>
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>

                                <Button variant="primary" onClick={handleShow}>
                                    Save Changes
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Hi, {user?.fullName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to save the information?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default UserInfoComponent