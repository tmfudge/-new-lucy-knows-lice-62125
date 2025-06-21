import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <p className="text-sm text-gray-300 mb-3">
            © 2024 Lucy Knows Lice Survival Kit. Educational resource only. Individual results may vary.
          </p>
          
          <div className="flex justify-center space-x-6 text-xs text-gray-400">
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/disclaimers" className="hover:text-white transition-colors">Disclaimers</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Disclaimer;