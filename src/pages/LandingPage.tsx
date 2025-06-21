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

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Simulate purchase flow - in real app this would handle payment
  const handlePurchase = () => {
    // Here you would normally:
    // 1. Process payment
    // 2. Create user account
    // 3. Send confirmation email
    // 4. Redirect to portal
    
    // For demo, we'll just redirect to portal
    navigate('/portal');
  };

  return (
    <div className="min-h-screen bg-white">
      <AlertBar />
      <Hero onPurchase={handlePurchase} />
      <PanicRelief />
      <AgitationSection onPurchase={handlePurchase} />
      <MythBusting />
      <SolutionSection onPurchase={handlePurchase} />
      <CostComparison onPurchase={handlePurchase} />
      <KitContents onPurchase={handlePurchase} />
      <ScientificBacking />
      <Testimonials onPurchase={handlePurchase} />
      <FAQ />
      <UrgencySection />
      <MoneyBackGuarantee />
      <FinalCTA onPurchase={handlePurchase} />
      <Disclaimer />
      <FloatingCharacter />
    </div>
  );
};

export default LandingPage;