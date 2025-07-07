const OpenAI = require('openai');

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Your custom assistant ID
const ASSISTANT_ID = 'asst_iZFLhw33e3RWkihX9Zw23uX0';

exports.handler = async (event, context) => {
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { message, threadId } = JSON.parse(event.body || '{}');

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    console.log('Received message:', message);
    console.log('Thread ID:', threadId);

    // ALWAYS use Lucy's custom responses - no OpenAI fallback for now
    console.log('Using Lucy\'s custom response system');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: generateLucyResponse(message),
        threadId: threadId || `lucy_${Date.now()}`,
      }),
    };

  } catch (error) {
    console.error('Chat function error:', error);
    
    // Even on error, use Lucy's responses
    const { message } = JSON.parse(event.body || '{}');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: generateLucyResponse(message || ''),
        threadId: `lucy_${Date.now()}`,
      }),
    };
  }
};

function generateLucyResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  console.log('Generating Lucy response for:', lowerMessage);
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || !message.trim()) {
    return "Hi there! I'm Lucy's AI assistant, and I'm here to help you through this lice situation with confidence! 🦟\n\nI know exactly how overwhelming this can feel - that 2 AM panic when you first find them crawling around. But here's the thing: you're going to get through this, and I'm going to help you do it the RIGHT way.\n\nWhat's your biggest concern right now? Are you:\n• Just discovering lice for the first time?\n• Dealing with a treatment that isn't working?\n• Worried about your whole family?\n• Stressed about school policies?\n• Confused by all the conflicting advice online?\n\nTell me what's keeping you up at night, and let's tackle it together! 💪";
  }
  
  // Treatment effectiveness questions
  if (lowerMessage.includes('working') || lowerMessage.includes('effective') || lowerMessage.includes('work') || lowerMessage.includes('treatment')) {
    return "Great question! Here's how to know if Lucy's enzyme method is working:\n\n✅ **GOOD SIGNS (within 24-48 hours):**\n• Dead lice that don't move when touched\n• Nits that slide off easily during combing\n• Less scratching and irritation\n• No new live lice appearing\n\n❌ **RED FLAGS (need to retreat):**\n• Live lice still crawling around after 48 hours\n• New nits appearing close to the scalp\n• Continued heavy scratching with visible movement\n\n🎯 **The Lucy Method Timeline:**\n• **Hour 1:** Enzymes start dissolving nit cement\n• **Hour 24:** Most lice should be dead or dying\n• **Hour 48:** Clear improvement should be obvious\n• **Day 3:** Critical recheck - this determines success!\n\nRemember: seeing dead lice is GOOD! It means the enzymes worked. Only worry if you see live, moving bugs after 48 hours.\n\nWhat are you seeing right now? Describe what you're finding and I'll help you interpret it! 🔍";
  }
  
  // Retreatment questions
  if (lowerMessage.includes('retreat') || lowerMessage.includes('again') || lowerMessage.includes('repeat') || lowerMessage.includes('second') || lowerMessage.includes('still see')) {
    return "If you're still seeing live lice on Day 3, don't panic - this happens to about 15% of families, and here's exactly what to do:\n\n🔄 **RETREAT PROTOCOL:**\n1. **Don't wait** - retreat immediately with the full Day 1 process\n2. **Focus on missed areas** - behind ears, nape of neck, crown\n3. **Take your time** - spend extra time on systematic combing\n4. **Check your technique** - make sure you're going section by section\n\n🎯 **Why retreatment is sometimes needed:**\n• Thick hair can hide lice in hard-to-reach spots\n• Some lice may have been in areas you missed\n• Occasionally, a few eggs hatch after initial treatment\n\n💪 **The good news:**\n• Second treatments have a 98% success rate\n• You now know exactly what to look for\n• Most families are completely clear after retreat\n\n**Lucy's Pro Tip:** Use a bright flashlight and take breaks. Tired eyes miss things. Better to be thorough than to do this a third time!\n\nAre you seeing live lice right now, or are you just worried about retreating? Let me know what you're finding! 🔍";
  }
  
  // Completion/success questions
  if (lowerMessage.includes('gone') || lowerMessage.includes('done') || lowerMessage.includes('finished') || lowerMessage.includes('clear') || lowerMessage.includes('success')) {
    return "You're asking the RIGHT question! Here's Lucy's definitive \"Are We Done?\" checklist:\n\n✅ **YOU'RE SUCCESSFUL WHEN:**\n• **No live, moving lice** during thorough inspection\n• **Day 3 recheck is clear** (this is the big one!)\n• **Day 7 recheck is clear** (weekly milestone)\n• **Day 14 recheck is clear** (two-week milestone)\n\n🎯 **WHAT'S NORMAL TO STILL SEE:**\n• Dead lice (they don't disappear immediately)\n• Empty nit shells (can stick around for weeks)\n• Some continued itching (psychological and healing)\n\n❌ **WHAT MEANS YOU'RE NOT DONE:**\n• ANY live, moving lice\n• New nits appearing close to scalp\n• Fresh bite marks appearing\n\n📅 **Lucy's Success Timeline:**\n• **Day 3:** Most critical check - determines if treatment worked\n• **Day 7:** Weekly milestone - catch any missed eggs\n• **Day 14:** Two-week mark - you're in the clear!\n• **Day 21:** Final check - celebrate your success! 🎉\n\n**The secret:** Most people quit checking too early. The 21-day follow-up is what separates success from re-infestation!\n\nWhere are you in this timeline? What are you seeing during your checks? 🔍";
  }
  
  // Scratching concerns
  if (lowerMessage.includes('scratch') || lowerMessage.includes('itch') || lowerMessage.includes('itchy') || lowerMessage.includes('stop scratching')) {
    return "Oh, the scratching! This is one of the most frustrating parts, but I've got good news and practical solutions:\n\n🧠 **WHY THE SCRATCHING CONTINUES:**\n• **Psychological itching** - your brain is on high alert now\n• **Scalp irritation** - from the treatment and combing process\n• **Healing bites** - existing bites take time to heal\n• **Habit formation** - scratching becomes automatic\n\n⏰ **NORMAL TIMELINE:**\n• **Days 1-3:** Intense itching is normal\n• **Week 1:** Gradual improvement\n• **Week 2:** Should be much better\n• **Beyond 2 weeks:** Mostly psychological\n\n🛠️ **LUCY'S ITCH-STOPPING TOOLKIT:**\n• **Cool compresses** - 10 minutes of relief\n• **Trim nails short** - prevent damage from scratching\n• **Distraction activities** - keep hands busy\n• **Gentle scalp massage** - with fingertips, not nails\n• **Anti-itch shampoo** - if scalp is really irritated\n\n🚨 **WHEN TO WORRY:**\n• Pus or yellow discharge\n• Fever or swollen lymph nodes\n• Scratches that won't heal\n• Severe pain or tenderness\n\nRemember: Scratching doesn't mean the lice are back! Focus on looking for live bugs, not just the itch.\n\nHow long has the scratching been going on? Are you seeing any live lice when you check? 🔍";
  }
  
  // Family screening questions
  if (lowerMessage.includes('family') || lowerMessage.includes('check') || lowerMessage.includes('others') || lowerMessage.includes('siblings') || lowerMessage.includes('everyone')) {
    return "Smart thinking! Family screening is CRUCIAL and most people do it wrong. Here's Lucy's systematic approach:\n\n🔍 **LUCY'S FAMILY SCREENING PROTOCOL:**\n\n**STEP 1: Set up properly**\n• Bright natural light (by a window)\n• Comfortable seating\n• Metal comb and clips ready\n• 15 minutes per person minimum\n\n**STEP 2: Know what you're looking for**\n• **Live lice:** Moving bugs (size of sesame seed)\n• **Fresh nits:** White/yellow eggs glued near scalp\n• **Focus areas:** Behind ears, nape of neck, crown\n\n**STEP 3: Check systematically**\n• Part hair in 1/4 inch sections\n• Look at scalp, not just hair\n• Use comb to catch anything you miss visually\n• Take photos if you're unsure\n\n🎯 **LUCY'S SCREENING RULES:**\n• **Only treat confirmed cases** - don't treat \"just in case\"\n• **Recheck clear family members weekly** for 3 weeks\n• **Start with the most likely suspects** (close contact)\n• **Don't panic if you find more** - treat them the same way\n\n👨‍👩‍👧‍👦 **FAMILY DYNAMICS:**\n• Kids who share beds/pillows = highest risk\n• Adults get lice too (especially moms!)\n• Babies under 2 need special gentle approach\n• Teens might hide symptoms from embarrassment\n\nWho in your family needs checking? Have you found lice on anyone else yet? Let me walk you through the process! 👥";
  }
  
  // Product/shopping questions
  if (lowerMessage.includes('buy') || lowerMessage.includes('product') || lowerMessage.includes('where') || lowerMessage.includes('need') || lowerMessage.includes('shopping')) {
    return "Perfect! Let me give you Lucy's exact shopping list - no guesswork, no wasted money:\n\n🛒 **LUCY'S ESSENTIAL SHOPPING LIST:**\n\n**🥇 MUST-HAVE (Don't skip these!):**\n• **Enzyme-based treatment** - LiceLogic, Nix Ultra, or Licefreee! ($15-20)\n• **Metal lice comb** - NitFree Terminator or LiceMeister ($10-15)\n• **Bright LED flashlight** - for proper inspection ($8-12)\n• **Hair sectioning clips** - to keep hair organized ($3-5)\n\n**🥈 HELPFUL EXTRAS:**\n• **White towels** - to see lice clearly ($10)\n• **Magnifying glass** - for detailed inspection ($5-8)\n• **Shower cap** - for treatment processing ($2)\n\n🏪 **WHERE TO BUY:**\n• **CVS, Walgreens, Rite Aid** - usually have everything\n• **Amazon** - for quick delivery (especially combs)\n• **Target, Walmart** - good selection and prices\n\n❌ **LUCY'S \"DON'T WASTE YOUR MONEY\" LIST:**\n• Pyrethrin-based treatments (Rid, etc.) - 65% resistance rate\n• Lice sprays for furniture - unnecessary\n• \"Prevention\" shampoos - no scientific proof\n• Electric combs - gimmicky and ineffective\n\n💰 **TOTAL COST:** $25-35 for everything you need!\n\n**Lucy's Pro Tip:** Buy the good metal comb first - it's the most important tool and lasts forever!\n\nWhat do you already have at home? I can help you prioritize what to buy first! 🛍️";
  }
  
  // Cleaning questions
  if (lowerMessage.includes('clean') || lowerMessage.includes('wash') || lowerMessage.includes('house') || lowerMessage.includes('laundry') || lowerMessage.includes('bedding')) {
    return "Ah, the cleaning panic! Let me save you hours of unnecessary work with Lucy's smart cleaning strategy:\n\n🔥 **HIGH PRIORITY (Do these FIRST):**\n• **Infected person's bedding** - wash in hot water (130°F+), dry on high heat 40+ minutes\n• **Recently worn clothes** - last 2 days, same hot wash/dry\n• **Hair tools** - brushes, combs, hair ties in hot water 10 minutes\n• **Bag non-washables** - stuffed animals, pillows for 2 weeks\n\n🧹 **MEDIUM PRIORITY (Day 2-3):**\n• **Vacuum upholstered furniture** - where heads touch\n• **Car seats and headrests** - quick vacuum\n• **Other family bedding** - preventive washing\n• **Carpets in bedrooms** - quick vacuum\n\n❌ **DON'T WASTE TIME ON:**\n• Deep cleaning entire house\n• Washing every piece of clothing you own\n• Special lice sprays or treatments\n• Cleaning walls, ceilings, or floors\n• Washing items not used in last 48 hours\n\n🧪 **THE SCIENCE:** Lice can only survive 24-48 hours off the human head. They need blood meals and can't live on furniture!\n\n⏰ **LUCY'S CLEANING TIMELINE:**\n• **Day 1:** Focus on bedding and recent clothes\n• **Day 2:** Vacuum furniture and car\n• **Day 3:** Finish up any remaining items\n• **Week 1:** Regular cleaning routine\n\n**Lucy's Reality Check:** I've seen parents spend 20 hours cleaning when 2 hours of smart cleaning would do the job!\n\nWhat's your biggest cleaning concern? Let me help you prioritize! 🧽";
  }
  
  // Panic/emotional support
  if (lowerMessage.includes('panic') || lowerMessage.includes('stress') || lowerMessage.includes('help') || lowerMessage.includes('scared') || lowerMessage.includes('worried') || lowerMessage.includes('overwhelmed')) {
    return "Hey, take a deep breath with me. I know exactly how you're feeling right now. 🫂\n\nI remember that 10:47 PM moment when I first found them crawling in my daughter's hair. The panic, the shame, the \"how did this happen to MY family?\" feeling. You're not alone, and you're not failing.\n\n💪 **HERE'S WHAT I NEED YOU TO REMEMBER:**\n• **1 in 4 kids get lice** - this is incredibly common\n• **Lice prefer CLEAN hair** - this isn't about hygiene\n• **You're not a bad parent** - good parents deal with this all the time\n• **This is temporary** - you WILL get through this\n• **You found the right help** - you're already doing better than most\n\n🎯 **RIGHT NOW, FOCUS ON THIS:**\nWhat's the very next step you need to take? Not the whole overwhelming process - just the next single thing. Break it down:\n• Do you need to buy supplies?\n• Do you need to do the first treatment?\n• Do you need to check family members?\n• Do you just need someone to tell you it's going to be okay?\n\n🌟 **YOU'RE ALREADY WINNING BECAUSE:**\n• You're seeking good information instead of panicking\n• You're taking action instead of ignoring it\n• You found a proven method instead of random Google advice\n• You're being a responsible parent\n\n**Lucy's Promise:** Thousands of parents have been exactly where you are right now, and they got through it. You will too. I'm here to guide you every step of the way.\n\nWhat's the biggest thing stressing you out right now? Let's tackle it together! 💙";
  }
  
  // School/return questions
  if (lowerMessage.includes('school') || lowerMessage.includes('return') || lowerMessage.includes('when') || lowerMessage.includes('back') || lowerMessage.includes('daycare')) {
    return "School policies can be confusing, but I'll help you navigate this like a pro! 🏫\n\n📋 **MOST SCHOOLS FOLLOW THE 'NO LIVE LICE' POLICY:**\n• Can return after treatment starts (usually next day)\n• Don't need to be completely \"nit-free\"\n• Dead nits and empty shells are okay\n• Focus is on preventing spread, not perfection\n\n🎯 **LUCY'S SCHOOL RETURN STRATEGY:**\n\n**STEP 1: Know your school's policy**\n• Call the school nurse directly\n• Ask specifically about their lice policy\n• Get it in writing if possible\n\n**STEP 2: Communicate proactively**\n• \"Hi, we discovered lice and started treatment immediately\"\n• \"We're following a proven elimination protocol\"\n• \"When can [child's name] return to school?\"\n\n**STEP 3: Get clearance**\n• Most schools do a quick visual check\n• They're looking for live lice, not nits\n• Bring documentation of treatment if requested\n\n**STEP 4: Follow up**\n• Check in with teacher about missed work\n• Monitor for any new cases in the classroom\n\n🤝 **WORKING WITH SCHOOL STAFF:**\n• School nurses deal with this regularly - they're not judging you\n• They want kids back in school as soon as it's safe\n• Most are very understanding and helpful\n• They've seen it all - you're not the first!\n\n⏰ **TYPICAL TIMELINE:**\n• **Day 1:** Discover lice, start treatment\n• **Day 2:** Usually can return to school\n• **Day 3:** Critical recheck (do this at home)\n\n**Lucy's Reality Check:** Your child is typically no longer contagious after the first proper treatment!\n\nWhat's your school's specific policy? Have you talked to them yet? 📞";
  }
  
  // Time/urgency questions
  if (lowerMessage.includes('how long') || lowerMessage.includes('time') || lowerMessage.includes('quick') || lowerMessage.includes('fast') || lowerMessage.includes('timeline')) {
    return "Great question! Let me give you Lucy's realistic timeline so you know exactly what to expect:\n\n⏰ **LUCY'S TREATMENT TIMELINE:**\n\n**DAY 1 (The Big Day):**\n• **Prep time:** 15 minutes (gather supplies, set up)\n• **Treatment application:** 10 minutes (saturate hair)\n• **Processing time:** 45 minutes (let enzymes work)\n• **Systematic combing:** 30-90 minutes (depends on hair)\n• **Cleanup:** 15 minutes\n• **Total:** 2-3 hours (but worth every minute!)\n\n**DAY 2 (Quick Check):**\n• **Visual inspection:** 15 minutes\n• **Spot treatment if needed:** 30 minutes\n• **Light combing:** 15 minutes\n• **Total:** 30-60 minutes\n\n**DAY 3 (Critical Recheck):**\n• **Thorough inspection:** 30 minutes\n• **Full retreat if needed:** 2-3 hours\n• **Documentation:** 10 minutes\n• **Total:** 30 minutes to 3 hours\n\n🎯 **SUCCESS TIMELINE:**\n• **24 hours:** Most lice should be dead\n• **48 hours:** Clear improvement visible\n• **72 hours:** Success or retreat decision\n• **1 week:** Weekly milestone check\n• **2 weeks:** Major milestone - almost there!\n• **3 weeks:** Final check - celebration time! 🎉\n\n⚡ **LUCY'S SPEED TIPS:**\n• **Don't rush the combing** - this is where most people fail\n• **Take breaks** - tired eyes miss things\n• **Get help** - extra hands make it faster\n• **Good lighting** - saves time by seeing clearly\n\n**Lucy's Reality Check:** Most families see dramatic improvement within 24-48 hours, but the follow-up checks are what prevent re-infestation!\n\nWhere are you in this timeline right now? What step are you working on? ⏱️";
  }
  
  // Cost questions
  if (lowerMessage.includes('cost') || lowerMessage.includes('expensive') || lowerMessage.includes('money') || lowerMessage.includes('price') || lowerMessage.includes('afford')) {
    return "Let me break down the REAL costs so you can make a smart decision! 💰\n\n💸 **WHAT MOST PARENTS END UP SPENDING (The Hard Way):**\n• **First drugstore attempt:** $25-30\n• **Second treatment (first failed):** $30-35\n• **\"Special\" shampoo and spray:** $40-50\n• **Finally buy a good comb:** $15\n• **Professional clinic (desperation):** $350-600\n• **Lost wages from time off work:** $200-400\n• **TOTAL DISASTER:** $660-1,130 😱\n\n💡 **LUCY'S SMART APPROACH:**\n• **Enzyme treatment:** $15-20\n• **Quality metal comb:** $10-15\n• **Basic supplies:** $5-10\n• **TOTAL INVESTMENT:** $30-45 ✨\n\n📊 **THE MATH:**\n• **Lucy's method:** $30-45 total\n• **Average \"trial and error\" approach:** $600-900\n• **YOUR SAVINGS:** $550-850! 🎉\n\n🏆 **BUT WAIT, THERE'S MORE VALUE:**\n• **Time saved:** 20+ hours of frustration\n• **Stress reduction:** Priceless peace of mind\n• **Knowledge for life:** Handle future cases confidently\n• **Family harmony:** No more fighting about treatments\n\n💪 **LUCY'S COST REALITY CHECK:**\n\"I spent $550 trying everything else before I figured this out. Now I help families get it right the FIRST time for under $50. The education is worth 10x what you pay!\"\n\n🎯 **INVESTMENT BREAKDOWN:**\n• **$30-45:** One-time supply cost\n• **2-3 hours:** Time investment\n• **Lifetime confidence:** Knowing you can handle this\n\n**Bottom Line:** You're not buying products - you're investing in knowledge that saves you hundreds and gives you confidence for life!\n\nWhat's your budget concern? Let me help you prioritize the most important items first! 💳";
  }
  
  // Nits/eggs questions
  if (lowerMessage.includes('nits') || lowerMessage.includes('eggs') || lowerMessage.includes('white') || lowerMessage.includes('stuck')) {
    return "Ah, the nits! These little troublemakers are what trip up most parents. Let me give you Lucy's complete nit knowledge:\n\n🥚 **WHAT ARE NITS EXACTLY:**\n• Lice eggs glued to hair shafts with cement-like substance\n• About the size of a pinhead\n• Usually within 1/4 inch of scalp (where it's warm)\n• Take 7-10 days to hatch\n\n🔍 **LUCY'S NIT IDENTIFICATION GUIDE:**\n\n**LIVE NITS (Need to go!):**\n• White to yellow color\n• Firmly attached near scalp\n• Oval shaped, not round\n• Won't flake off like dandruff\n\n**DEAD/EMPTY NITS (Okay to leave):**\n• Clear or brown color\n• Further from scalp (hair grew out)\n• May be loose or easily removed\n• No longer a threat\n\n**NOT NITS (Don't worry about these):**\n• Dandruff - flakes off easily\n• Hair casts - slide off hair shaft\n• Dirt or lint - washes out\n• Hair product buildup - dissolves with shampoo\n\n🧪 **HOW LUCY'S ENZYME METHOD WORKS ON NITS:**\n• **Dissolves the cement** that glues nits to hair\n• **Makes removal easier** during combing\n• **Prevents hatching** of viable eggs\n• **Loosens old nits** that were stuck\n\n⚡ **LUCY'S NIT REMOVAL TECHNIQUE:**\n1. **Apply enzyme treatment** - let it work 45 minutes\n2. **Comb systematically** - section by section\n3. **Pinch and slide** - fingernails work great too\n4. **Wipe comb frequently** - see what you're getting\n5. **Don't obsess** - focus on live lice first\n\n🎯 **LUCY'S NIT REALITY CHECK:**\n• **You don't need to get every single nit** - focus on live lice\n• **Dead nits can stay for weeks** - they're not dangerous\n• **Schools usually don't require nit-free** - check your policy\n• **Obsessing over nits causes more stress than necessary**\n\nWhat are you seeing when you look? Describe the nits and I'll help you figure out if they're a concern! 🔍";
  }
  
  // Default helpful response with Lucy's personality
  return "Hi there! I'm Lucy's AI assistant, and I can feel the stress in your message. Let me help you get through this! 🦟\n\nI'm here to guide you through EXACTLY what Lucy discovered after her own 10:47 PM panic moment. No more confusing Google searches, no more wasted money on treatments that don't work.\n\n🎯 **I can help you with:**\n• **\"Is my treatment working?\"** - How to know if you're on the right track\n• **\"Do I need to retreat?\"** - When and how to do a second treatment\n• **\"Who else needs checking?\"** - Family screening that actually works\n• **\"What do I actually need to clean?\"** - Smart cleaning, not panic cleaning\n• **\"When can my kid go back to school?\"** - Navigating school policies\n• **\"How much will this cost?\"** - Real costs vs. the $500+ million industry\n• **\"I'm freaking out!\"** - Emotional support and reality checks\n• **\"What should I buy?\"** - Exact shopping lists, no guesswork\n• **\"How long does this take?\"** - Realistic timelines\n• **\"Are these nits or not?\"** - Identification help\n\n💪 **Lucy's Promise:** You're going to get through this, and I'm going to help you do it the RIGHT way - no more confusion, no more wasted money, no more panic.\n\nWhat's your biggest concern right now? Just tell me what's keeping you up at night, and let's tackle it together! 🌟";
}