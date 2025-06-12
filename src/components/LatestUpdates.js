'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockData } from '@/lib/api';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';

export default function LatestUpdates() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === mockData.updates.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === mockData.updates.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? mockData.updates.length - 1 : prevIndex - 1
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-mandai-green mb-4 font-jakarta">
            Latest Updates
          </h2>
          <p className="text-xl text-black font-jakarta">
            Stay informed with the latest exam updates and important announcements
          </p>
        </div>

        {/* Updates Carousel */}
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl shadow-xl bg-beige">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {mockData.updates.map((update) => (
                <div
                  key={update.id}
                  className="w-full flex-shrink-0 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center bg-white rounded-2xl"
                  style={{ minHeight: 320 }}
                >
                  {/* Image */}
                  <div className="w-full md:w-1/2 h-56 md:h-64 rounded-xl overflow-hidden shadow-md flex-shrink-0 relative">
                    <Image
                      src={update.image}
                      alt={update.title}
                      fill
                      className="object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="inline-flex items-center px-4 py-2 bg-mandai-green text-black    rounded-full text-sm font-medium mb-6 font-jakarta">
                      {update.category}
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-mandai-green mb-4 font-jakarta leading-tight">
                      {update.title}
                    </h3>
                    
                    <p className="text-lg text-black mb-6 font-jakarta leading-relaxed">
                      {update.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-black font-jakarta">
                        <Calendar className="h-5 w-5 mr-2" />
                        {formatDate(update.date)}
                      </div>
                      
                      <Link
                        href={`/updates/${update.id}`}
                        className="inline-flex items-center px-6 py-3 bg-[#003400] text-beige rounded-lg font-semibold font-jakarta hover:bg-mandai-dark transition-colors"
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-beige hover:bg-mandai-green text-mandai-green hover:text-beige p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 border border-mandai-green"
            aria-label="Previous update"
          >
            <ArrowLeft className="h-6 w-6 text-black" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-beige hover:bg-mandai-green text-mandai-green hover:text-beige p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 border border-mandai-green"
            aria-label="Next update"
          >
            <ArrowRight className="h-6 w-6 text-black" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {mockData.updates.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 border border-mandai-green ${
                  index === currentIndex 
                    ? 'bg-[#003400] scale-125' 
                    : 'bg-beige hover:bg-mandai-green'
                }`}
                aria-label={`Go to update ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Updates Button */}
        <div className="text-center mt-12">
          <Link
            href="/updates"
            className="inline-flex items-center px-8 py-4 border-2 border-[#003400] text-[#003400] rounded-lg font-semibold text-lg font-jakarta  hover:text-beige transition-all duration-200"
          >
            View All Updates
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
} 