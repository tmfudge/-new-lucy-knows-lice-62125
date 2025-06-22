import React, { useEffect, useRef } from 'react';

interface StripeBuyButtonProps {
  className?: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': {
        'buy-button-id': string;
        'publishable-key': string;
        children?: React.ReactNode;
      };
    }
  }
}

const StripeBuyButton: React.FC<StripeBuyButtonProps> = ({ 
  className = '', 
  onSuccess, 
  onError 
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Listen for Stripe events if callbacks are provided
    if (onSuccess || onError) {
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== 'https://js.stripe.com') return;
        
        if (event.data.type === 'stripe_checkout_session_success' && onSuccess) {
          onSuccess();
        } else if (event.data.type === 'stripe_checkout_session_error' && onError) {
          onError(event.data.error);
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, [onSuccess, onError]);

  return (
    <div ref={buttonRef} className={className}>
      <stripe-buy-button
        buy-button-id="buy_btn_1Rcd13Cp3AbpLDA16kDJQZzM"
        publishable-key="pk_live_dzMty0pUST8a8p5gksSmMAqF"
      />
    </div>
  );
};

export default StripeBuyButton;