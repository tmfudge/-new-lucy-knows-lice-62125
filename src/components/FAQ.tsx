import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "Will this really work if drugstore treatments failed?",
      answer: "Yes! 95% of drugstore treatments fail because lice have developed resistance to the chemicals. Lucy's method uses enzyme-based treatments that dissolve the cement holding nits to hair - something lice can't become resistant to. Plus, you get the systematic approach that ensures you don't miss anything.",
      category: "effectiveness"
    },
    {
      question: "How is this different from what I can find on Google?",
      answer: "Google gives you 47 different conflicting methods with no way to know what actually works. Lucy's kit gives you ONE proven system with exact step-by-step instructions, timing, and follow-up protocols. Plus 24/7 support when you get stuck. It's the difference between a recipe and a cooking class with a master chef.",
      category: "value"
    },
    {
      question: "What if my child has really thick/long/curly hair?",
      answer: "The method works on ALL hair types. In fact, thick and curly hair often responds better because the enzyme treatment has more time to work. The kit includes specific techniques for different hair textures, and our support team has helped families with every hair type imaginable.",
      category: "hair-type"
    },
    {
      question: "Is this safe for young children (under 5)?",
      answer: "Absolutely. The enzyme treatments are gentler than most shampoos - no harsh chemicals or pesticides. The method is actually SAFER than drugstore treatments. We include specific guidance for toddlers and babies, including how to make the process less stressful for little ones.",
      category: "safety"
    },
    {
      question: "What if I find lice again after treatment?",
      answer: "The 21-day recheck calendar prevents this, but if it happens, you get lifetime access to the materials and can repeat the process. Our support team will also help you figure out what went wrong. Most 'reinfestations' are actually missed nits from the original treatment.",
      category: "reinfection"
    },
    {
      question: "How quickly will I get access after purchase?",
      answer: "Immediately! Everything is digital, so you'll get instant access to all materials. If you're dealing with lice right now at 2 AM, you can start the emergency protocol within 5 minutes of purchase.",
      category: "access"
    },
    {
      question: "Do I need to buy special products or tools?",
      answer: "You'll need a metal lice comb ($10-15) and enzyme treatment ($15-20). Total additional cost is about $30-35. The kit tells you exactly what to buy and where to find it. Everything else you probably have at home.",
      category: "cost"
    },
    {
      question: "What if multiple family members have lice?",
      answer: "The same method works for everyone. You'll learn how to efficiently screen and treat multiple people. Many families successfully treat 3-4 kids with the same system. The cost per person works out to about $7-10 total.",
      category: "multiple"
    },
    {
      question: "Is there really 24/7 support?",
      answer: "Yes! Real humans, not bots. Our team includes parents who've been through this and lice specialists. Average response time is under 10 minutes. We know lice don't follow business hours, and neither do we.",
      category: "support"
    },
    {
      question: "What if I'm not tech-savvy?",
      answer: "Everything is designed for stressed parents, not tech experts. Simple PDFs you can print, videos you can watch on any device, and step-by-step checklists. If you can read email, you can use this system.",
      category: "tech"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Questions from Worried Parents (Just Like You)
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to the questions keeping you up at night
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-bold text-gray-800 pr-4">{faq.question}</h3>
                {openFAQ === index ? (
                  <ChevronUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="px-8 pb-6">
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-gray-700 leading-relaxed text-lg">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">
            Still Have Questions?
          </h3>
          <p className="text-blue-700 mb-6">
            Don't let uncertainty keep you stuck in lice hell. Get answers from real humans who understand what you're going through.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">Chat with Support</h4>
              <p className="text-blue-700 text-sm mb-4">Get instant answers from lice specialists</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Start Chat Now
              </button>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">Call Emergency Line</h4>
              <p className="text-blue-700 text-sm mb-4">Speak to someone who's been there</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Call Now: 1-800-LUCY-HELP
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;