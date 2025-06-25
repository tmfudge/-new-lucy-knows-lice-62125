// Google Analytics tracking utilities
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Track page views
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'AW-17205780783', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

// Track custom events
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      ...parameters,
    });
  }
};

// Track purchase button clicks with detailed context
export const trackPurchaseClick = (buttonLocation: string, buttonText: string, sectionName?: string) => {
  const eventData = {
    event_category: 'purchase_intent',
    event_label: buttonLocation,
    button_text: buttonText,
    section_name: sectionName || 'unknown',
    timestamp: new Date().toISOString(),
    page_url: window.location.href,
    page_path: window.location.pathname,
  };

  // Track the click event
  trackEvent('purchase_button_click', eventData);

  // Also track as a conversion event for Google Ads
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'AW-17205780783',
      event_category: 'purchase_intent',
      event_label: buttonLocation,
    });
  }

  console.log('🎯 Purchase Click Tracked:', eventData);
};

// Track section views (when user scrolls to different sections)
export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    event_category: 'engagement',
    event_label: sectionName,
    section_name: sectionName,
  });
};

// Track time spent on page
export const trackTimeOnPage = () => {
  const startTime = Date.now();
  
  const trackTime = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000); // in seconds
    trackEvent('time_on_page', {
      event_category: 'engagement',
      event_label: 'page_exit',
      value: timeSpent,
    });
  };

  // Track when user leaves the page
  window.addEventListener('beforeunload', trackTime);
  
  // Track at intervals for users who stay long
  setTimeout(() => {
    trackEvent('time_milestone', {
      event_category: 'engagement',
      event_label: '30_seconds',
      value: 30,
    });
  }, 30000);

  setTimeout(() => {
    trackEvent('time_milestone', {
      event_category: 'engagement',
      event_label: '2_minutes',
      value: 120,
    });
  }, 120000);

  setTimeout(() => {
    trackEvent('time_milestone', {
      event_category: 'engagement',
      event_label: '5_minutes',
      value: 300,
    });
  }, 300000);
};

// Track scroll depth
export const trackScrollDepth = () => {
  let maxScroll = 0;
  const milestones = [25, 50, 75, 90, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !tracked.has(milestone)) {
          tracked.add(milestone);
          trackEvent('scroll_depth', {
            event_category: 'engagement',
            event_label: `${milestone}_percent`,
            value: milestone,
          });
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
};

// Track external link clicks
export const trackExternalClick = (url: string, linkText: string) => {
  trackEvent('external_link_click', {
    event_category: 'outbound',
    event_label: url,
    link_text: linkText,
  });
};

// Track form interactions
export const trackFormInteraction = (formName: string, action: 'start' | 'complete' | 'abandon') => {
  trackEvent('form_interaction', {
    event_category: 'form',
    event_label: `${formName}_${action}`,
    form_name: formName,
    action: action,
  });
};

// Track video/content engagement
export const trackContentEngagement = (contentType: string, action: string, contentName?: string) => {
  trackEvent('content_engagement', {
    event_category: 'content',
    event_label: `${contentType}_${action}`,
    content_type: contentType,
    content_name: contentName || '',
    action: action,
  });
};

// Enhanced purchase tracking with abandonment detection
export const initializePurchaseTracking = () => {
  let purchaseClicked = false;
  let purchaseStartTime: number | null = null;

  // Track when user clicks purchase button
  const trackPurchaseStart = (location: string, buttonText: string, section?: string) => {
    purchaseClicked = true;
    purchaseStartTime = Date.now();
    trackPurchaseClick(location, buttonText, section);
  };

  // Track if user returns without completing purchase
  const trackPurchaseAbandonment = () => {
    if (purchaseClicked && purchaseStartTime) {
      const timeSpent = Math.round((Date.now() - purchaseStartTime) / 1000);
      trackEvent('purchase_abandonment', {
        event_category: 'conversion',
        event_label: 'returned_without_purchase',
        time_spent_on_checkout: timeSpent,
      });
    }
  };

  // Listen for page visibility changes (user switching tabs/returning)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && purchaseClicked) {
      // User returned to the page after clicking purchase
      setTimeout(trackPurchaseAbandonment, 2000); // Wait 2 seconds to see if they complete
    }
  });

  return { trackPurchaseStart };
};