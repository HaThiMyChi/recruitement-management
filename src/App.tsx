import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeComponent from './pages/HomeComponent';
import LoginComponent from './pages/LoginComponent';
import AdminComponent from './pages/AdminComponent';
import MainComponent from './pages/MainComponent';
import JobComponent from './pages/JobComponent';
import SignUpComponent from './pages/SignUpComponent';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/" element={<HomeComponent />}>
        <Route index element={<MainComponent />} />
        <Route path="/jobs" element={<JobComponent />} />
      </Route>
      <Route path="/register" element={<SignUpComponent />} />
      <Route path="/admin" element={<AdminComponent />} />
    </Routes>
  );
}

export default App;
