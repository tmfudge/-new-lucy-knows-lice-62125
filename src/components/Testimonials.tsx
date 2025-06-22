import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialsProps {
  onPurchase: (customClassName?: string) => React.ReactNode;
}

const Testimonials: React.FC<TestimonialsProps> = ({ onPurchase }) => {
  const mainTestimonials = [
    {
      stars: 5,
      quote: "Found this resource at midnight when I was panicking. The survival kit gave me exactly what I needed to know, step by step. My daughter was lice-free the next day using these methods!",
      author: "Rachel T.",
      location: "Atlanta, GA"
    },
    {
      stars: 5,
      quote: "I've tried every head lice treatment but there were always bugs that came back. This educational kit showed me exactly what I was doing wrong. It was like having expert guidance in my pocket.",
      author: "Jenny L.",
      location: "Charlotte, SC"
    },
    {
      stars: 5,
      quote: "I'm a single mom with two kids. I don't have time for guesswork. This survival kit made something I thought would be totally unmanageable actually doable. Worth every penny!",
      author: "Maria V.",
      location: "Austin, TX"
    }
  ];

  const beforeCTATestimonials = [
    {
      quote: "I can't believe this educational resource only costs $27. I spent $400+ trying everything else. This systematic approach should be what doctors recommend FIRST, not last.",
      author: "Kristen M., Registered Nurse",
      location: "Los Angeles, CA • Verified Purchase",
      borderColor: "border-orange-500"
    },
    {
      quote: "My husband was skeptical about buying 'another' lice solution online. 24 hours later, he was telling everyone about this educational system. BEST $27 we ever spent.",
      author: "Jennifer & Mark D.",
      location: "Chicago, IL • Verified Purchase",
      borderColor: "border-green-500"
    },
    {
      quote: "Day care provider here. I've seen hundreds of lice cases. This is the ONLY educational resource I've seen that consistently teaches methods that work AND keeps parents calm.",
      author: "Amanda T., Licensed Childcare Provider",
      location: "Phoenix, AZ • Verified Purchase",
      borderColor: "border-blue-600"
    },
    {
      quote: "Homeschool mom of 6. When one got lice, I was terrified of it spreading. This prevention guide kept the other 5 lice-free while I treated the first using these methods.",
      author: "Stephanie R.",
      location: "Dallas, TX • Verified Purchase",
      borderColor: "border-purple-600"
    }
  ];

  const renderStars = (count: number) => {
    return Array(count).fill(0).map((_, i) => (
      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
    ));
  };

  return (
    <>
      {/* Main Testimonials Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
            Real Parents, Real Results
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            See how this educational resource helped parents just like you
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {mainTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-3xl shadow-lg border-t-4 border-orange-500 hover:-translate-y-2 transition-transform duration-300">
                <div className="flex mb-6">
                  {renderStars(testimonial.stars)}
                </div>
                <p className="text-gray-700 italic text-lg leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="font-bold text-gray-800 text-lg">{testimonial.author}</div>
                <div className="text-gray-600">{testimonial.location}</div>
              </div>
            ))}
          </div>

          <div className="text-center bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl border-2 border-green-500">
            <p className="text-2xl text-green-700 font-semibold">
              ⭐ Trusted by 1,000+ Parents • Educational Resource • 100% Satisfaction ⭐
            </p>
          </div>
        </div>
      </section>

      {/* Before CTA Testimonials */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
            Don't Just Take Our Word For It...
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Here's what parents are saying about this educational resource
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {beforeCTATestimonials.map((testimonial, index) => (
              <div key={index} className={`bg-white p-8 rounded-3xl shadow-lg border-l-4 ${testimonial.borderColor} hover:-translate-y-2 transition-transform duration-300`}>
                <div className="flex mb-4">
                  {renderStars(5)}
                </div>
                <p className="text-gray-700 italic text-lg leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="font-bold text-gray-800">{testimonial.author}</div>
                <div className="text-gray-500 text-sm">{testimonial.location}</div>
              </div>
            ))}
          </div>

          {/* Strategic CTA After Testimonials */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-10 rounded-3xl text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Join 1,500+ Success Stories?</h3>
            <p className="text-lg opacity-90 mb-6">
              Every parent above was exactly where you are right now - stressed, frustrated, and looking for a reliable educational resource that actually helps.
            </p>
            <div className="mb-4">
              {onPurchase('inline-block')}
            </div>
            <div className="text-orange-100 text-sm">
              ✓ Same Results These Parents Got ✓ Instant Access ✓ 14-Day Guarantee
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;