import React, { useEffect } from 'react';
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
import { 
  trackPageView, 
  trackTimeOnPage, 
  trackScrollDepth, 
  initializePurchaseTracking,
  trackPurchaseClick 
} from '../utils/analytics';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Track page view
    trackPageView('/', 'Lucy Knows Lice - Landing Page');
    
    // Initialize tracking
    trackTimeOnPage();
    trackScrollDepth();
    const { trackPurchaseStart } = initializePurchaseTracking();

    // Store purchase tracking function globally for components to use
    (window as any).trackPurchaseStart = trackPurchaseStart;

    return () => {
      // Cleanup event listeners if needed
    };
  }, []);

  // Enhanced purchase handler with detailed tracking
  const handlePurchase = (buttonLocation: string = 'unknown', sectionName?: string) => {
    const buttonText = 'Get Lucy\'s Survival Kit - $27';
    
    // Track the purchase intent
    trackPurchaseClick(buttonLocation, buttonText, sectionName);
    
    // Also use the global tracking function
    if ((window as any).trackPurchaseStart) {
      (window as any).trackPurchaseStart(buttonLocation, buttonText, sectionName);
    }

    console.log('🛒 Purchase button clicked:', { buttonLocation, sectionName });
    
    try {
      // Direct redirect to Stripe - best UX with least friction
      window.location.href = "https://buy.stripe.com/aFa14meLO7Uyc9EgLo9oc02";
    } catch (error) {
      console.error('Purchase redirect failed:', error);
      // Fallback: open in new tab
      window.open("https://buy.stripe.com/aFa14meLO7Uyc9EgLo9oc02", '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AlertBar />
      <Hero onPurchase={(location) => handlePurchase(location || 'hero', 'Hero Section')} />
      <PanicRelief />
      <AgitationSection onPurchase={(location) => handlePurchase(location || 'agitation', 'Agitation Section')} />
      <MythBusting />
      <SolutionSection onPurchase={(location) => handlePurchase(location || 'solution', 'Solution Section')} />
      <CostComparison onPurchase={(location) => handlePurchase(location || 'cost-comparison', 'Cost Comparison')} />
      <KitContents onPurchase={(location) => handlePurchase(location || 'kit-contents', 'Kit Contents')} />
      <ScientificBacking />
      <Testimonials onPurchase={(location) => handlePurchase(location || 'testimonials', 'Testimonials')} />
      <FAQ />
      <UrgencySection />
      <MoneyBackGuarantee />
      <FinalCTA onPurchase={(location) => handlePurchase(location || 'final-cta', 'Final CTA')} />
      <Disclaimer />
      <FloatingCharacter />
    </div>
  );
};

export default LandingPage;