import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Summariser from './components/Summariser';

const LandingPage = () => {
  // const navigate = useNavigate();
  // navigate('/login');
  return <h1>Welcome to Summariser.</h1>
}

const PageList = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/summariser" element={<Summariser />} />
      </Routes>
    </>
  );
}

export default PageList;