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

  // Simple Google Drive redirect for now
  const handlePurchase = () => {
    // Replace this URL with your actual Google Drive folder link
    const googleDriveLink = "https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE?usp=sharing";
    
    // Open in new tab so they don't lose your site
    window.open(googleDriveLink, '_blank');
    
    // Optional: Also redirect to a thank you page
    // navigate('/thank-you');
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