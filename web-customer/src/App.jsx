import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RequestForm from './components/RequestForm';
import Register from './pages/Register';
import Login from './pages/LoginPage';
import { isLoggedIn } from './api/useAuth';

function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    const handleStorageChange = () => setLoggedIn(isLoggedIn());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={loggedIn ? <RequestForm setLoggedIn={setLoggedIn} /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={!loggedIn ? <Login setLoggedIn={setLoggedIn} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
