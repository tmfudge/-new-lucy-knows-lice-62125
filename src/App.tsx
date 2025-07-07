import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Terms from './pages/Terms';
import Portal from './pages/Portal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/terms" element={<Terms />} />
        {/* All legal routes point to the same comprehensive Terms page */}
        <Route path="/privacy" element={<Terms />} />
        <Route path="/disclaimers" element={<Terms />} />
        <Route path="/legal" element={<Terms />} />
        {/* Portal route commented out - will reactivate when ready for portal launch */}
        <Route path="/portal/*" element={<Portal />} />
      </Routes>
    </Router>
  );
}

export default App;