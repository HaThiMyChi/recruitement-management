import logo from '../assets/logo/react_logo.png';
import '../assets/AdminPage.css';
import { useState } from 'react';
import JobManage from '../components/JobManageComponent';

const AdminComponent: React.FC = () => {
    const [showUserPage, setShowUserPage] = useState(true);
    const [showJobPage, setShowJobPage] = useState(false);
    const [showJobLogPage, setShowJobLogPage] = useState(false);

    const handleUserClick = () => {
        setShowUserPage(true);
    }

    const handleJobClick = () => {
        setShowJobPage(true);
    }

    const handleJobLogClick = () => {
        setShowJobLogPage(true);
    }

    return (
        <div>
            <div className="sidebar">
                <div className="sidebar-header border-bottom">
                    <div className="navbar-logo">
                        <a href="#">
                            <img src={logo} alt="" />
                        </a>
                    </div>
                    <div className='tabbar'>
                        <div className='manageUser componentBox'>
                            <button onClick={handleUserClick}>
                                <i className='bi bi-person'></i>Manage Users
                            </button>
                        </div>
                        <div className='manageJob componentBox'>
                            <button onClick={handleJobClick}>
                                Manage Jobs
                            </button>
                        </div>
                        <div className='manageJobLog componentBox'>
                            <button onClick={handleJobLogClick}>
                                Manage Job Logs
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='user_info'>
                <div className='top-menu'>
                    <a href="#">Dashboard</a>
                    <a href="#">Users</a>
                    <a href="#">Job</a>
                    <a href="#">Job Log</a>
                </div>

                <div className='notification-box'>
                    <div className='dropdown'>
                        <button className='btn btn-primary dropdown-toggle' type='button' id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            nguyen dinh hau
                        </button>
                        <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                            <li><a href="#" className='dropdown-item'>1</a></li>
                            <li><a href="#" className='dropdown-item'>2</a></li>
                            <li><a href="#" className='dropdown-item'>3</a></li>
                            <li><a href="#" className='dropdown-item'>4</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='main-content'>
                {showJobPage && <JobManage />}
            </div>
        </div>
    );
}

export default AdminComponent;