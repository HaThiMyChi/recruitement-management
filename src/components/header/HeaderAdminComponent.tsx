import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../../app/store"
import { GetListJobs } from "../../app/slices/jobs.slice"
import { Button, NavDropdown } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const HeaderAdminComponent = () => {
    const token = localStorage.getItem('token');
    const user  = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    const dispatch = useDispatch();

    const getListJobs = () => {
        dispatch(GetListJobs());
    }

    return (
         <div>
            <div className="sidebar">
                <div className="sidebar-header border-bottom">
                    <div className="navbar-logo">
                        <Link to={'/admin'}>
                            <img src="https://c.topdevvn.com/v4/assets/images/td-logo.png" alt="" />
                        </Link>
                    </div>
                    <div className='tabbar'>
                        <div className='manageUser componentBox'>
                            <Link to={'/'} className='linkElement'>
                                <i className='bi bi-person'></i>Manage Users
                            </Link>
                        </div>
                        <div className='manageJob componentBox'>
                            <Link to={'/admin/manage_jobs'} className='linkElement' onClick={getListJobs}>
                                Manage Jobs
                            </Link>
                        </div>
                        <div className='manageJobLog componentBox'>
                            <Link to={'/admin/job-logs'} className='linkElement'>
                                Manage Job Logs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='user_info'>
                <div className='top-menu'>
                    <Link to={'/admin'} className='linkElement'>Dashboard</Link>
                    <Link to={'/admin'} className='linkElement'>Users</Link>
                    <Link to={'/admin/manage_jobs'} className='linkElement'>Job</Link>
                    <Link to={'/admin'} className='linkElement'>Job Log</Link>
                </div>

                <div className="user_infor_div">
                    {
                        token && user ? (
                            <Button variant="danger" className="btn_infor">
                                <NavDropdown title={
                                    <>
                                        <FontAwesomeIcon icon={faUser} />{user?.email}
                                    </>
                                } id="collapsible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">
                                        Dashboard
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Job Management
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Applied Jobs</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Button>
                        ) : (
                            <Button className='btn_infor' variant="danger">
                                <Link to={'/login'} className="btn_login">Login</Link>
                            </Button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default HeaderAdminComponent;