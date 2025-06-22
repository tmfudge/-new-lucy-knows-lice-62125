import React from 'react';
import { useNavigate } from 'react-router-dom';
import AlertBar from '../components/AlertBar';
import Hero from '../components/Hero';
import PanicRelief from '../components/PanicRelief';
import AgitationSection from '../components/AgitationSection';
import MythBusting from '../components/MythBusting';
import SolutionSection from '../components/SolutionSection';
import CostComparison from '../components/CostComparison';
import KitContents from '../components/KitContents';
import ScientificBacking from '../components/ScientificBacking';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import UrgencySection from '../components/UrgencySection';
import MoneyBackGuarantee from '../components/MoneyBackGuarantee';
import FinalCTA from '../components/FinalCTA';
import FloatingCharacter from '../components/FloatingCharacter';
import Disclaimer from '../components/Disclaimer';
import StripeBuyButton from '../components/StripeBuyButton';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Handle purchase success
  const handlePurchaseSuccess = () => {
    // You can add analytics tracking here
    console.log('Purchase successful!');
    
    // Optionally redirect to a thank you page or show a success message
    // navigate('/thank-you');
  };

  // Handle purchase error
  const handlePurchaseError = (error: any) => {
    console.error('Purchase error:', error);
    // You can show an error message to the user here
  };

  // Create a function that returns the Stripe buy button
  const renderPurchaseButton = (customClassName?: string) => {
    return (
      <StripeBuyButton 
        className={customClassName}
        onSuccess={handlePurchaseSuccess}
        onError={handlePurchaseError}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <AlertBar />
      <Hero onPurchase={renderPurchaseButton} />
      <PanicRelief />
      <AgitationSection onPurchase={renderPurchaseButton} />
      <MythBusting />
      <SolutionSection onPurchase={renderPurchaseButton} />
      <CostComparison onPurchase={renderPurchaseButton} />
      <KitContents onPurchase={renderPurchaseButton} />
      <ScientificBacking />
      <Testimonials onPurchase={renderPurchaseButton} />
      <FAQ />
      <UrgencySection />
      <MoneyBackGuarantee />
      <FinalCTA onPurchase={renderPurchaseButton} />
      <Disclaimer />
      <FloatingCharacter />
    </div>
  );
};

export default LandingPage;