import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RequestForm from './components/RequestForm';
import Register from './pages/Register';
import Login from './pages/LoginPage';
import { isLoggedIn } from './api/useAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn() ? <RequestForm /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
