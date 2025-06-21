import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
// import Portal from './pages/Portal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Portal route commented out - will reactivate when ready for portal launch */}
        {/* <Route path="/portal/*" element={<Portal />} /> */}
      </Routes>
    </Router>
  );
}

export default App;