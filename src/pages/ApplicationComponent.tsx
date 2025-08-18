import { Container, Pagination, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../app/store"
import { useEffect, useState } from "react"
import { getApplications } from "../app/slices/application.slice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

const ApplicationComponent: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const response = useSelector((state: RootState) => state.application.data)
    const applications = response?.data
    const meta = response?.meta
    const totalPage = meta?.totalPages
    const currentPage = meta?.currentPage

    const [page, setPage] = useState(1)
    const [limit, setLimmit] = useState(10)

    useEffect(() => {
        dispatch(getApplications({page, limit}))
    }, [page, limit])

    return (
        <Container>
            {
                applications && meta && applications.length > 0 ? (applications?.map(application => (
                    <Row style={{padding: '15px'}} key={`application-${application.id}`}>
                        <div style={{display: 'flex'}} className="application-container">
                            <Link to={`/applications/${application.id}`}>
                                <img style={{ width: '80px', height: '80px' }} src="https://congtytui1.com/storage/images/companies/heineken-vietnam.png"></img>
                            </Link>

                            <div className="application" style={{paddingLeft: '15px'}}>
                                <h6>{application.jobTitle}</h6>
                                <span>{application.status}</span> <br></br>
                                <span>
                                    <FontAwesomeIcon icon={faClock}></FontAwesomeIcon> {new Date(application.updatedAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </Row>
                ))
                ) : (
                    <Row>
                        <h4>No data application</h4>
                    </Row>
                )
            }
            <Row>
                <Pagination style={{display: 'flex', justifyContent: 'center'}}>
                    {[...Array(totalPage)].map((_, index) => (
                        <Pagination.Item key={index + 1} active={currentPage === index + 1} onClick={() => setPage(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </Row>
        </Container>
    )
}
export default ApplicationComponent
