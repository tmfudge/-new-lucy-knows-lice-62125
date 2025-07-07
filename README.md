-new-lucy-knows-lice-62125

<AlertBar />                    // "🚨 Found Head Lice? Don't Panic..."
<Hero onPurchase={handlePurchase} />           // "STOP! Before You Google..."
<PanicRelief />                 // "If You're Reading This at 2 AM..."
<AgitationSection />            // "Here's What Most Parents Get Wrong..."
<MythBusting />                 // "STOP Falling for These Expensive Lies"
<SolutionSection />             // "Meet Lucy: The Mom Who Cracked the Code"
<CostComparison />              // "What Parents Actually Spend..."
<KitContents onPurchase={handlePurchase} />   // "Here's What You Get With Lucy's Survival Kit"
<ScientificBacking />           // "The Science Behind What Actually Works"
<Testimonials />                // "Real Parents, Real Results"
<FAQ />                         // "Questions from Worried Parents"
<UrgencySection />              // "Why You Need to Act TODAY"
<MoneyBackGuarantee />          // "Love It or Get Your Money Back"
<FinalCTA onPurchase={handlePurchase} />      // "Ready to End This Nightmare?"
<Disclaimer />                  // Footer with legal links
<FloatingCharacter />           // Floating help button

Each section is in its own component file in src/components/:

AlertBar.tsx - Top notification bar
Hero.tsx - Main headline and CTA (just updated)
PanicRelief.tsx - 2 AM panic scenarios
AgitationSection.tsx - Common mistakes parents make
MythBusting.tsx - Debunking lice myths
SolutionSection.tsx - Lucy's story
CostComparison.tsx - Cost breakdown vs alternatives
KitContents.tsx - What's included in the kit
ScientificBacking.tsx - Research citations
Testimonials.tsx - Customer reviews
FAQ.tsx - Frequently asked questions
UrgencySection.tsx - Why act now
MoneyBackGuarantee.tsx - Guarantee details
FinalCTA.tsx - Final call to action
Disclaimer.tsx - Footer and legal
# Trigger deployment to pick up new environment variables
Deployment trigger - Updated with OpenAI API key
