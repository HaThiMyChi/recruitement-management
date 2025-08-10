import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeComponent from './pages/HomeComponent';
import LoginComponent from './pages/LoginComponent';
import AdminComponent from './pages/AdminComponent';
import MainComponent from './pages/MainComponent';
import JobComponent from './pages/JobComponent';
import SignUpComponent from './pages/SignUpComponent';
import UserInfoComponent from './pages/UserInfoComponent';
import JobManageComponent from './pages/JobManageComponent';
import ApplicationComponent from './pages/ApplicationComponent';
import ApplicationDetailComponent from './pages/ApplicationDetailComponent';
import JobLogsPage from './pages/JobLogsPage/JobLogsPage';
import JobLogDetailPage from './pages/JobLogDetailPage/JobLogDetailPage';
import UserManagementComponent from './pages/UserManagementComponent';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/" element={<HomeComponent />}>
        <Route index element={<MainComponent />} />
        <Route path="/jobs" element={<JobComponent />} />
        <Route path='/applications' element={<ApplicationComponent />} />
        <Route path='/applications/:id' element={<ApplicationDetailComponent />} />
        <Route path="/me" element={<UserInfoComponent />} />
      </Route>
      <Route path="/register" element={<SignUpComponent />} />
      <Route path="/admin" element={<AdminComponent />}>
        <Route path="/admin/manage_jobs" element={<JobManageComponent />} />
        <Route path="/admin/job-logs" element={<JobLogsPage />} />
        <Route path="/admin/job-logs/:id" element={<JobLogDetailPage />} />
        <Route path="/admin/users" element={<UserManagementComponent />} />
      </Route>
    </Routes>
  );
}

export default App;
