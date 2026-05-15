import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import AllListing from './Pages/AllListing';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/listings" element={<AllListing />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
