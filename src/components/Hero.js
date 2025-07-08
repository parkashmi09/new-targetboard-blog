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
        console.log('Fetching banners from:', `${process.env.NEXT_PUBLIC_BASE_URL}/banners`);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/banners`);
        if (response.ok) {
          const data = await response.json();
          console.log('Banner API response:', data);
          // Handle direct array response
          if (Array.isArray(data) && data.length > 0) {
            console.log('Setting banners from direct array:', data);
            setBanners(data);
          } else if (data.banners && data.banners.length > 0) {
            // Fallback for nested structure
            console.log('Setting banners from nested structure:', data.banners);
            setBanners(data.banners);
          } else {
            console.log('No banners found in response');
          }
        } else {
          console.error('Failed to fetch banners, status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
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

  useEffect(() => {
    console.log('Banners state updated:', banners);
    console.log('Current banner index:', current);
    console.log('Current banner:', banners[current]);
  }, [banners, current]);

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
            {currentBanner ? currentBanner.title : slide.heading}
          </h1>
          <p className="text-xl text-black mb-8 font-jakarta leading-relaxed max-w-xl drop-shadow">
            {currentBanner ? currentBanner.description : slide.subheading}
          </p>
          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href={currentBanner?.url || "#"}
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
            {banners.length > 0 ? (
              banners.map((banner, idx) => (
                <div key={banner._id} className={`absolute inset-0 transition-opacity duration-500 ${idx === current && fade ? 'opacity-100' : 'opacity-0'}`}>
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title || 'Education Banner'}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                    onLoad={() => console.log(`✅ Banner ${idx} loaded:`, banner.imageUrl)}
                    onError={(e) => {
                      console.error(`❌ Banner ${idx} failed to load:`, banner.imageUrl);
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMzQwMCIvPgogIDx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VGFyZ2V0IEJvYXJkPC90ZXh0Pgo8L3N2Zz4K';
                    }}
                    priority
                  />
                  {/* Debug info */}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    Banner {idx + 1}/{banners.length} - {idx === current ? 'Active' : 'Hidden'}
                  </div>
                </div>
              ))
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#003400] to-green-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-2xl font-bold mb-2">Target Board</h3>
                  <p className="text-lg">Your gateway to success</p>
                  <p className="text-sm mt-2 opacity-75">
                    {banners.length === 0 ? 'No banners loaded' : 'Loading banners...'}
                  </p>
                </div>
              </div>
            )}

            {/* Overlay Content - Only show click indication when URL exists */}
            {currentBanner?.url && (
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10">
                <div className="text-white text-sm font-semibold bg-black/50 px-4 py-2 rounded-full self-end">
                  Click to explore →
                </div>
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