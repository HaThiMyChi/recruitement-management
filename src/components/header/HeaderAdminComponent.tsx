import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { GetListJobs } from "../../app/slices/jobs.slice"
import { Button, NavDropdown } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { UserRole } from "../../enums/UserRole"

const HeaderAdminComponent = () => {
    const token = localStorage.getItem('token');
    const user  = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    const userRole = user?.role || null;

    const dispatch = useDispatch();

    const getListJobs = () => {
        // dispatch(GetListJobs());
    }

    const canAccessUsers = userRole && userRole !== UserRole.CANDIDATE;
    const canAccessJobLogs = userRole && userRole !== UserRole.CANDIDATE;

    // Check if user can access applications (all role can access, but with different permissions)
    const canAccessApplications = userRole !== null;


    return (
         <div>
            <div className="sidebar">
                <div className="sidebar-header border-bottom">
                    <div className="navbar-logo">
                        <Link to={'/admin/'}>
                            <img src="https://c.topdevvn.com/v4/assets/images/td-logo.png" alt="Logo" />
                        </Link>
                    </div>
                    <div className='tabbar'>
                        {canAccessUsers && (
                             <div className='manageUser componentBox'>
                                <Link to={'/admin/users'} className='linkElement'>
                                    <i className='bi bi-person'></i>Manage Users
                                </Link>
                            </div>
                        )}
                       
                        {/* <div className='manageJob componentBox'>
                            <Link to={'/admin/manage_jobs'} className='linkElement' onClick={getListJobs}>
                                Manage Jobs
                            </Link>
                        </div> */}
                        {canAccessJobLogs && (
                            <div className='manageJobLog componentBox'>
                                <Link to={'/admin/job-logs'} className='linkElement'>
                                    Manage Job Logs
                                </Link>
                            </div>
                        )}
                        
                        {canAccessApplications && (
                            <div className="manageJobLog componentBox">
                                <Link to={'/admin/applications'} className="linkElement">
                                    {userRole === UserRole.CANDIDATE ? 'My Applications' : 'Manage Applications'}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='user_info'>
                <div className='top-menu'>
                    <Link to={'/admin'} className='linkElement'>Dashboard</Link>
                    {canAccessUsers && (
                        <Link to={'/admin/users'} className='linkElement'>Users</Link>
                    )}
                    <Link to={'/admin/manage_jobs'} className='linkElement'>Job</Link>
                    {canAccessJobLogs && (
                        <Link to={'/admin/job-logs'} className='linkElement'>Job Log</Link>
                    )}
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
                                    <NavDropdown.Item href="/admin">
                                        Dashboard
                                    </NavDropdown.Item>

                                    {userRole === UserRole.CANDIDATE ? (
                                        <NavDropdown.Item href="/admin/applications">
                                            My Applications
                                        </NavDropdown.Item>
                                    ) : (
                                        <NavDropdown.Item href="/admin/manage_jobs">
                                            Job Management
                                        </NavDropdown.Item>
                                    )}
                                   
                                   {userRole === UserRole.CANDIDATE && (
                                        <NavDropdown.Item href="/admin/applied_jobs">Applied Jobs</NavDropdown.Item>
                                   )}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => {
                                        localStorage.removeItem('token');
                                        localStorage.removeItem('user');
                                        window.location.href = '/login';
                                    }}>
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