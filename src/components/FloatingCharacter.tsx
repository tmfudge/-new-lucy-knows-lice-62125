import React from 'react';

const FloatingCharacter: React.FC = () => {
  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed bottom-6 right-6 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer z-50 border-4 border-orange-500 animate-bounce hover:animate-none hover:scale-110 transition-transform duration-300"
      onClick={scrollToOrder}
    >
      <div className="text-4xl">🐛</div>
    </div>
  );
};

export default FloatingCharacter;