import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Alert from './pages/Alert';
import HarassmentReport from './pages/HarassmentReport';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route path="/main" element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } />
        
        <Route path="/alert" element={
          <ProtectedRoute>
            <Alert />
          </ProtectedRoute>
        } />

        <Route path="/harassment-report" element={
          <ProtectedRoute>
            <HarassmentReport />
          </ProtectedRoute>
        } />

        <Route path="/resources" element={
          <ProtectedRoute>
            <Resources />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
