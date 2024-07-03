//Import Modules and Components
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FormPage from "./components/FormPage";
import SecondPage from './components/SecondPage';

const App: React.FC = () => {
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const userDetails = localStorage.getItem('userDetails');
    return userDetails ? children : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/second" element={
          <ProtectedRoute>
            <SecondPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;