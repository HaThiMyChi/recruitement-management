import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../app/store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getApplicationById } from "../app/slices/application.slice";
import { Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const ApplicationDetailComponent: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const {id} = useParams<{id: string}>()
    const application = useSelector((state: RootState) => state.application.application)

    useEffect(() => {
        const applicationId = Number(id)
        if (!id || isNaN(applicationId)) {
            toast.error('Invalid Application ID')
            return
        }
        dispatch(getApplicationById(applicationId))
    }, [id])

    return (
        <Container>
            <Row style={{padding: '15px'}}>
                <div style={{display: 'flex'}} className="application-container">
                    <img style={{ width: '110px', height: '110px' }} src="https://congtytui1.com/storage/images/companies/heineken-vietnam.png"></img>

                    <div className="application" style={{paddingLeft: '15px'}}>
                        <h5>{application?.jobTitle}</h5>
                        <span>{application?.status}</span> <br></br>
                        <span><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> {application?.createdAt ? new Date(application.createdAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                </div>
            </Row>
            <Row>
                <div style={{padding: '20px'}}>
                    <div>
                        <span>{application?.coverLetter}</span>
                    </div>
                    <hr></hr>
                    <div>
                        {application?.answers?.map(answer => (
                            <div>
                                <span>{answer.question}</span> <br/>
                                <span>{answer.answer}</span> <br></br>
                            </div>
                        ))}
                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default ApplicationDetailComponent;