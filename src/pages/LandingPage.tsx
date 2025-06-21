import React from 'react';
import { useNavigate } from 'react-router-dom';
import AlertBar from '../components/AlertBar';
import Hero from '../components/Hero';
import AgitationSection from '../components/AgitationSection';
import MythBusting from '../components/MythBusting';
import SolutionSection from '../components/SolutionSection';
import KitContents from '../components/KitContents';
import ScientificBacking from '../components/ScientificBacking';
import Testimonials from '../components/Testimonials';
import UrgencySection from '../components/UrgencySection';
import Guarantee from '../components/Guarantee';
import FinalCTA from '../components/FinalCTA';
import FloatingCharacter from '../components/FloatingCharacter';

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
      <AgitationSection />
      <MythBusting />
      <SolutionSection />
      <KitContents onPurchase={handlePurchase} />
      <ScientificBacking />
      <Testimonials />
      <UrgencySection />
      <Guarantee />
      <FinalCTA onPurchase={handlePurchase} />
      <FloatingCharacter />
    </div>
  );
};

export default LandingPage;