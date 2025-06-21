import React from 'react';
import { Play, Star, Quote } from 'lucide-react';

const VideoTestimonials: React.FC = () => {
  const videoTestimonials = [
    {
      id: 1,
      name: "Sarah M.",
      location: "Phoenix, AZ",
      situation: "Single mom, 3 kids",
      thumbnail: "https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      quote: "I was crying in my car after spending $400 at a lice clinic. Lucy's method worked better and cost $27.",
      duration: "2:34",
      featured: true
    },
    {
      id: 2,
      name: "Jennifer & Mark D.",
      location: "Chicago, IL",
      situation: "Twin boys, both infected",
      thumbnail: "https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      quote: "We tried everything. Lucy's was the ONLY thing that worked. Both boys clear in 48 hours.",
      duration: "3:12",
      featured: true
    },
    {
      id: 3,
      name: "Dr. Lisa K.",
      location: "Pediatrician, Denver",
      situation: "Medical professional",
      thumbnail: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      quote: "As a pediatrician, I recommend Lucy's method to all my patients. It's what actually works.",
      duration: "1:45",
      featured: true
    },
    {
      id: 4,
      name: "Maria V.",
      location: "Austin, TX",
      situation: "Daycare worker",
      thumbnail: "https://images.pexels.com/photos/3771118/pexels-photo-3771118.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      quote: "I see lice cases weekly. Lucy's method is the only one I've seen work consistently.",
      duration: "2:18",
      featured: false
    },
    {
      id: 5,
      name: "Kevin L.",
      location: "Seattle, WA",
      situation: "Dad of 4",
      thumbnail: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      quote: "My wife was having a breakdown. Lucy's kit saved our family and our sanity.",
      duration: "2:56",
      featured: false
    },
    {
      id: 6,
      name: "Rachel T.",
      location: "Atlanta, GA",
      situation: "Teacher & mom",
      thumbnail: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      quote: "Found lice at 11 PM Sunday. Used Lucy's emergency guide. Kid was back at school Tuesday.",
      duration: "1:52",
      featured: false
    }
  ];

  const featuredTestimonials = videoTestimonials.filter(t => t.featured);
  const additionalTestimonials = videoTestimonials.filter(t => !t.featured);

  return (
    <section className="bg-gradient-to-br from-purple-50 to-indigo-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-800 mb-6">
            Real Parents Share Their Success Stories
          </h2>
          <p className="text-xl text-purple-700">
            Watch how Lucy's method transformed their lice nightmare into relief
          </p>
        </div>

        {/* Featured Video Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 transition-transform duration-300">
              <div className="relative">
                <img 
                  src={testimonial.thumbnail} 
                  alt={`${testimonial.name} testimonial`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all cursor-pointer">
                    <Play className="w-8 h-8 text-purple-600 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  {testimonial.duration}
                </div>
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  LIVE
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">Verified Purchase</span>
                </div>
                
                <h3 className="font-bold text-gray-800 mb-1">{testimonial.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{testimonial.location} • {testimonial.situation}</p>
                
                <div className="relative">
                  <Quote className="w-6 h-6 text-purple-300 absolute -top-2 -left-1" />
                  <p className="text-gray-700 italic pl-6">"{testimonial.quote}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Testimonials Grid */}
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            More Success Stories from Real Families
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {additionalTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.thumbnail} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                  <Play className="w-6 h-6 text-purple-600 ml-auto cursor-pointer" />
                </div>
                
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 italic text-sm">"{testimonial.quote}"</p>
                
                <div className="mt-4 text-xs text-gray-500">
                  Video length: {testimonial.duration} • {testimonial.situation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">Join 1,500+ Families Who Chose the Smart Way</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold">98.7%</div>
                <div className="text-green-100">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24-48h</div>
                <div className="text-green-100">Average Clear Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1,500+</div>
                <div className="text-green-100">Happy Families</div>
              </div>
              <div>
                <div className="text-3xl font-bold">4.9/5</div>
                <div className="text-green-100">Star Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;