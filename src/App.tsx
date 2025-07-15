import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import AdminComponent from './components/AdminComponent';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeComponent />}></Route>
      <Route path="/login" element={<LoginComponent />}></Route>
      <Route path="/admin" element={<AdminComponent />}></Route>
    </Routes>
  );
}

export default App;
