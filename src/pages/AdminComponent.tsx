import '../assets/AdminPage.css';
import HeaderAdminComponent from '../components/header/HeaderAdminComponent';
import { Outlet } from 'react-router-dom';

const AdminComponent: React.FC = () => {
    
    return (
       <div>
            <HeaderAdminComponent />
            <Outlet />
       </div>
    );
}

export default AdminComponent;