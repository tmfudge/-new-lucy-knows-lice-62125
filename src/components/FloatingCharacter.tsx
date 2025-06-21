import React from 'react';

const FloatingCharacter: React.FC = () => {
  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer z-50 border-4 border-orange-500 animate-bounce hover:animate-none hover:scale-110 transition-transform duration-300 overflow-hidden"
      onClick={scrollToOrder}
    >
      <img 
        src="/Lucy Know Lice Bug" 
        alt="Lucy Bug Character" 
        className="w-full h-full object-contain"
        onError={(e) => {
          // Fallback to emoji if image fails
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = '<div class="text-3xl md:text-4xl">🐛</div>';
          }
        }}
      />
    </div>
  );
};

export default FloatingCharacter;