import logo from '../assets/logo/react_logo.png';
import '../assets/AdminPage.css';
const AdminComponent: React.FC = () => {
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
                            <button>
                                <i className='bi bi-person'></i>Manage Users
                            </button>
                        </div>
                        <div className='manageJob componentBox'>
                            <button>
                                Manage Jobs
                            </button>
                        </div>
                        <div className='manageJobLog componentBox'>
                            <button>
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
            </div>
        </div>
    );
}

export default AdminComponent;