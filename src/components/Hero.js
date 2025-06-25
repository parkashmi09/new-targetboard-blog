'use client';

import { GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        // Using provided static data instead of API call
        const data = [
          {
            "_id": "6856c4eafcdc042f32652398",
            "title": "11TH ENGLISH",
            "imageUrl": "https://image-store.blr1.digitaloceanspaces.com/banners/e0be1246-8db3-41e6-918d-850bb271d8d7.png",
            "createdAt": "2025-06-21T14:42:50.994Z",
            "updatedAt": "2025-06-24T20:05:03.493Z",
            "__v": 0,
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
            "url": "https://www.thumbnailguru.in/"
          },
          {
            "_id": "6856c4e4fcdc042f32652387",
            "title": "11TH ENGLISH",
            "imageUrl": "https://image-store.blr1.digitaloceanspaces.com/banners/4190ffdc-e951-4c6d-82db-4f148614552d.png",
            "createdAt": "2025-06-21T14:42:44.939Z",
            "updatedAt": "2025-06-24T20:05:18.240Z",
            "__v": 0,
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
            "url": ""
          },
          {
            "_id": "68474990c6f52f2e54023fe1",
            "title": "What is Lorem Ipsum",
            "imageUrl": "https://image-store.blr1.digitaloceanspaces.com/banners/fd89f29d-6045-43b2-8902-f9cea1762d49.png",
            "createdAt": "2025-06-09T20:52:32.292Z",
            "updatedAt": "2025-06-24T20:05:43.024Z",
            "__v": 0,
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
            "url": ""
          }
        ];
        setBanners(data || []);
      } catch (err) {
        console.error('Error setting banners:', err);
        // Fallback to a default banner if something goes wrong
        setBanners([{
          _id: 'fallback',
          imageUrl: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80',
          title: 'Education Hero',
          description: 'Your gateway to quality education',
          url: ''
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Content for each slide
  const slidesContent = [
    {
      tagline: "Empowering India&apos;s Learners",
      heading: (
        <>India&apos;s <span className="text-mandai-green underline">#1</span> Online<br />Learning Platform</>
      ),
      subheading: (
        <>
          Free online access to NCERT textbooks, solutions, and more.<br />
          Trusted by millions of students and educators across India.
        </>
      ),
      cta: 'Get Started Free',
    },
    {
      tagline: 'Infinite Opportunities Await',
      heading: (
        <>Where Every Door Leads<br />to Infinite Opportunities</>
      ),
      subheading: (
        <>
          Unlock your potential with top placements and resources.<br />
          Join 2Cr+ users and 1000+ schools today.
        </>
      ),
      cta: 'Join Now',
    },
    {
      tagline: 'Your Success, Our Mission',
      heading: (
        <>Achieve More with<br />Award-Winning Support</>
      ),
      subheading: (
        <>
          Best EdTech 2024. Comprehensive study materials and updates.<br />
          Start your journey to success!
        </>
      ),
      cta: 'Start Learning',
    },
  ];

  // Manual navigation handlers
  const prevSlide = () => {
    if (banners.length === 0) return;
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
      setFade(true);
    }, 300);
  };

  const nextSlide = () => {
    if (banners.length === 0) return;
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
      setFade(true);
    }, 300);
  };

  useEffect(() => {
    if (banners.length === 0) return;
    
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % banners.length);
        setFade(true);
      }, 1000); // fade out duration
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // Pick content for current slide, fallback to first if not enough slidesContent
  const slide = slidesContent[current % slidesContent.length];
  const currentBanner = banners[current];

  // Handle banner click
  const handleBannerClick = () => {
    if (currentBanner?.url) {
      window.open(currentBanner.url, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <section className="relative w-full min-h-[420px] flex items-center justify-center overflow-hidden bg-[#FAEBCE] px-4 md:px-0">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-beige via-ivory/80 to-beige z-0" />
        <div className="w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-6 relative z-10">
          {/* Left side content remains the same */}
          <div className="flex-1 min-w-[320px] max-w-[540px] text-left flex flex-col justify-center">
            <div className="mb-2 text-black text-lg font-semibold tracking-wide uppercase">Loading...</div>
            <h1 className="text-4xl font-extrabold text-mandai-green mb-4 font-jakarta leading-tight tracking-tight">
              Target Board
            </h1>
          </div>
          {/* Loading skeleton for image */}
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="relative w-full max-w-2xl aspect-[4/2] bg-gray-200 rounded-2xl shadow-2xl overflow-hidden animate-pulse">
              <div className="w-full h-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-[420px] flex items-center justify-center overflow-hidden bg-[#FAEBCE] px-4 md:px-0">
      {/* Optional background pattern/gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-beige via-ivory/80 to-beige z-0" />
      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-6 relative z-10">
        {/* Left Side: Text Content */}
        <div className="flex-1 min-w-[320px] max-w-[540px] text-left flex flex-col justify-center">
          {/* Tagline */}
          <div className="mb-2 text-black text-lg font-semibold tracking-wide uppercase">{slide.tagline}</div>
          <h1 className="text-4xl font-extrabold text-mandai-green mb-4 font-jakarta leading-tight tracking-tight">
            {slide.heading}
          </h1>
          {/* Show description from API data */}
          {currentBanner && (
            <p className="text-xl text-black mb-8 font-jakarta leading-relaxed max-w-xl drop-shadow">
              {currentBanner.description}
            </p>
          )}
          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#003400] text-beige rounded-full font-bold text-lg font-jakarta shadow-lg hover:bg-green-900 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-mandai-green"
            >
              {slide.cta}
              <GraduationCap className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
        {/* Right Side: Banner Images from API */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div 
            className={`relative w-full max-w-2xl aspect-[4/2] bg-white rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-[1.025] ${currentBanner?.url ? 'cursor-pointer' : ''}`}
            onClick={handleBannerClick}
          >
            {/* Floating #1 Rated Badge */}
            <div className="absolute top-4 right-4 z-30 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">#1 Rated</div>
            
            {/* Banner Images */}
            {banners.length > 0 && banners.map((banner, idx) => (
              <Image
                key={banner._id}
                src={banner.imageUrl}
                alt={banner.title || 'Education Banner'}
                fill
                className={`object-cover object-center transition-opacity duration-500 ${idx === current && fade ? 'opacity-100' : 'opacity-0'}`}
                loading={idx === 0 ? 'eager' : 'lazy'}
                style={{ filter: 'brightness(0.95) saturate(1.1)' }}
              />
            ))}

            {/* Overlay Content - Using API data */}
            {currentBanner && (
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10">
                {currentBanner.url && (
                  <div className="text-white text-sm font-semibold">
                    Click to learn more →
                  </div>
                )}
              </div>
            )}

            {/* Navigation Arrows - only show if multiple banners */}
            {banners.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-mandai-green rounded-full p-2 shadow z-20 focus:outline-none focus:ring-2 focus:ring-mandai-green"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="h-6 w-6 text-black" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-mandai-green rounded-full p-2 shadow z-20 focus:outline-none focus:ring-2 focus:ring-mandai-green"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="h-6 w-6 text-black" />
                </button>
              </>
            )}

            {/* Dots - only show if multiple banners */}
            {banners.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {banners.map((_, idx) => (
                  <span
                    key={idx}
                    className={`block w-2 h-2 rounded-full ${idx === current ? 'bg-[#003400]' : 'bg-white/60'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 