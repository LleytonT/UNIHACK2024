import {React, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Summariser from './components/Summariser';
import LandingPage from './components/LandingPage';

const PageList = () => {
  const [username, setUsername] = useState('');
  return (
    <>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register username={username} setUsername={setUsername}/>} />
        <Route path="/login" element={<Login username={username} setUsername={setUsername}/>} />
        <Route path="/summariser" element={<Summariser username={username} setUsername={setUsername}/>} />
      </Routes>
    </>
  );
}

export default PageList;