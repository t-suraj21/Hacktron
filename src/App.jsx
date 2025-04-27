import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Alert from './pages/Alert';
import HarassmentReport from './pages/HarassmentReport';
import Resources from './pages/Resources';
import MainPage from './pages/MainPage';
import Profile from './pages/Profile'; // ✅ Import Profile page
import ProtectedRoute from './components/ProtectedRoute'; // ✅ Import ProtectedRoute

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/main" element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/alert" element={<Alert />} />
        <Route path="/harassment-report" element={<HarassmentReport />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </Router>
  );
};

export default App;
