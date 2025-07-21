import logo from '../assets/logo/react_logo.png';
import '../assets/AdminPage.css';
import { useState } from 'react';
import JobManage from '../pages/JobManageComponent';
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