'use client';

import { GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockData } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function Hero() {
  const images = mockData.heroImages;
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

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
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + images.length) % images.length);
      setFade(true);
    }, 300);
  };
  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
      setFade(true);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 1000); // fade out duration
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Pick content for current slide, fallback to first if not enough slidesContent
  const slide = slidesContent[current % slidesContent.length];

  return (
    <section className="relative w-full min-h-[420px] flex items-center justify-center overflow-hidden bg-[#FAEBCE] px-4 md:px-0">
      {/* Optional background pattern/gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-beige via-ivory/80 to-beige z-0" />
      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-6 relative z-10">
        {/* Left Side: Text Content */}
        <div className="flex-1 min-w-[320px] max-w-[540px] text-left flex flex-col justify-center">
          {/* Tagline */}
          <div className="mb-2 text-black text-lg font-semibold tracking-wide uppercase">{slide.tagline}</div>
          <h1 className="text-4xl  font-extrabold text-mandai-green mb-4 font-jakarta leading-tight tracking-tight">
            {slide.heading}
          </h1>
          <p className="text-xl text-black mb-8 font-jakarta leading-relaxed max-w-xl drop-shadow">
            {slide.subheading}
          </p>
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
        {/* Right Side: Image Carousel Card */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="relative w-full max-w-2xl aspect-[4/2] bg-white rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-[1.025]">
            {/* Floating #1 Rated Badge */}
            <div className="absolute top-4 right-4 z-30 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">#1 Rated</div>
            {/* Carousel Images */}
            {images.map((img, idx) => (
              <img
                key={img}
                src={img}
                alt="Education Hero"
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${idx === current && fade ? 'opacity-100' : 'opacity-0'}`}
                loading={idx === 0 ? 'eager' : 'lazy'}
                style={{ filter: 'brightness(0.95) saturate(1.1)' }}
              />
            ))}
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10">
              <div className="text-white text-lg md:text-2xl font-bold drop-shadow mb-2">Where Every Door Leads to Infinite Opportunities</div>
              <div className="flex gap-6 text-white text-base md:text-lg font-semibold">
                <span>₹1.7 Cr Premier Placement</span>
                <span>#20 NIRF Rank</span>
                <span>9000+ Offers</span>
              </div>
            </div>
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-mandai-green rounded-full p-2 shadow z-20 focus:outline-none focus:ring-2 focus:ring-mandai-green"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="h-6 w-6 text-black" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-mandai-green rounded-full p-2 shadow z-20 focus:outline-none focus:ring-2 focus:ring-mandai-green"
              aria-label="Next Slide"
            >
              <ChevronRight className="h-6 w-6 text-black" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`block w-2 h-2 rounded-full ${idx === current ? 'bg-[#003400]' : 'bg-white/60'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 