import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import MusicRipper from './pages/MusicRipper';
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './utils/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
              <Route path="/music-ripper" element={<MusicRipper />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App