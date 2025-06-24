'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';

export default function LatestUpdates() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before running effects that could cause hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch latest blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://blog-backend-lv3o.onrender.com/api/v1/latest-blogs');
        // console.log(response,"response");
        if (!response.ok) {
          throw new Error('Failed to fetch latest blogs');
        }
        const data = await response.json();
        // Remove the console.log that's causing React render issues
        // Ensure we handle the data properly as an array
        setBlogs(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err.message);
        // Fallback to empty array if API fails
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Auto-advance carousel - only after component is mounted
  useEffect(() => {
    if (mounted && blogs.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === blogs.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [blogs.length, mounted]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === blogs.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? blogs.length - 1 : prevIndex - 1
    );
  };

  // Safe date formatting
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return 'Date not available';
    }
  };

  // Extract plain text from HTML content for description
  const extractTextFromHTML = (htmlContent) => {
    // Safety check for undefined or null content
    if (!htmlContent || typeof htmlContent !== 'string') {
      return 'No description available';
    }
    // Remove HTML tags and get first 120 characters for mobile
    const text = htmlContent.replace(/<[^>]*>/g, '').trim();
    return text.length > 120 ? text.substring(0, 120) + '...' : text;
  };

  // Get fallback image if previewImage is empty
  const getBlogImage = (blog) => {
    if (blog?.previewImage) {
      return blog.previewImage;
    }
    // Use a default image based on category
    const defaultImages = {
      'Technology': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80',
      'Business': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      'Lifestyle': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
      'Education': 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80'
    };
    const categoryName = blog?.category?.name || 'Education';
    return defaultImages[categoryName] || defaultImages['Education'];
  };

  // Touch handling for mobile swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-mandai-green mb-2 sm:mb-4 font-jakarta">
            Latest Updates
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-black font-jakarta px-4">
            Stay informed with the latest articles and important updates
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12 sm:py-16">
            <div className="relative inline-block mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-opacity-20 border-mandai-green animate-spin" style={{ borderTopColor: '#003400' }}></div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-mandai-green">
              Loading Latest Updates...
            </h3>
            <p className="text-sm sm:text-base opacity-75 text-black">
              Fetching the latest articles and updates
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12 sm:py-16">
            <div className="relative inline-block mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto shadow-xl" style={{ backgroundColor: '#EF4444' }}>
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-mandai-green">
              Failed to Load Updates
            </h3>
            <p className="text-sm sm:text-base opacity-75 mb-4 sm:mb-6 text-black px-4">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-mandai-green text-beige text-sm sm:text-base"
            >
              Retry
            </button>
          </div>
        )}

        {/* Main Content - Only show when not loading and no error */}
        {!loading && !error && blogs.length > 0 && (
          <>
            {/* Updates Carousel */}
            <div className="relative">
              {/* Carousel Container */}
              <div 
                className="overflow-hidden rounded-xl sm:rounded-2xl shadow-xl bg-beige"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {blogs.map((blog) => {
                    // Safety check to ensure blog object has required properties
                    if (!blog || !blog._id || !blog.title) {
                      return null;
                    }
                    
                    return (
                    <div
                      key={blog._id}
                      className="w-full flex-shrink-0 p-4 sm:p-6 lg:p-8 xl:p-12 bg-white rounded-xl sm:rounded-2xl"
                    >
                      {/* Mobile Layout - Stack vertically */}
                      <div className="flex flex-col space-y-4 sm:space-y-6 md:hidden">
                        {/* Image */}
                        <div className="w-full h-48 rounded-lg overflow-hidden shadow-md relative">
                          <Image
                            src={getBlogImage(blog)}
                            alt={blog.title || 'Blog image'}
                            fill
                            className="object-cover object-center"
                            loading="lazy"
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex flex-col">
                          <div className="inline-flex items-center justify-center px-3 py-1 bg-mandai-green text-black rounded-full text-xs font-medium mb-3 font-jakarta self-start">
                            {blog.category?.name || 'General'}
                          </div>
                          
                          <h3 className="text-lg font-bold text-mandai-green mb-3 font-jakarta leading-tight">
                            {blog.title || 'Untitled'}
                          </h3>
                          
                          <p className="text-sm text-black mb-4 font-jakarta leading-relaxed">
                            {blog.metaDescription || extractTextFromHTML(blog.content)}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-black font-jakarta text-xs">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(blog.createdAt)}
                            </div>
                            
                            <Link
                              href={`/blog/${blog._id}`}
                              className="inline-flex items-center px-4 py-2 bg-[#003400] text-beige rounded-lg font-semibold font-jakarta hover:bg-mandai-dark transition-colors text-sm"
                            >
                              Read More
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout - Side by side */}
                      <div className="hidden md:flex md:flex-row gap-6 lg:gap-8 items-center" style={{ minHeight: 320 }}>
                        {/* Image */}
                        <div className="w-full md:w-1/2 h-56 md:h-64 rounded-xl overflow-hidden shadow-md flex-shrink-0 relative">
                          <Image
                            src={getBlogImage(blog)}
                            alt={blog.title || 'Blog image'}
                            fill
                            className="object-cover object-center"
                            loading="lazy"
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="inline-flex items-center px-4 py-2 bg-mandai-green text-black rounded-full text-sm font-medium mb-6 font-jakarta self-start">
                            {blog.category?.name || 'General'}
                          </div>
                          
                          <h3 className="text-2xl md:text-3xl font-bold text-mandai-green mb-4 font-jakarta leading-tight">
                            {blog.title || 'Untitled'}
                          </h3>
                          
                          <p className="text-lg text-black mb-6 font-jakarta leading-relaxed">
                            {blog.metaDescription || extractTextFromHTML(blog.content)}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-black font-jakarta">
                              <Calendar className="h-5 w-5 mr-2" />
                              {formatDate(blog.createdAt)}
                            </div>
                            
                            <Link
                              href={`/blog/${blog._id}`}
                              className="inline-flex items-center px-6 py-3 bg-[#003400] text-beige rounded-lg font-semibold font-jakarta hover:bg-mandai-dark transition-colors"
                            >
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Arrows - Only show on desktop if multiple blogs */}
              {blogs.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="hidden sm:block absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 bg-beige hover:bg-mandai-green text-mandai-green hover:text-beige p-2 lg:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 border border-mandai-green"
                    aria-label="Previous update"
                  >
                    <ArrowLeft className="h-5 w-5 lg:h-6 lg:w-6 text-black" />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="hidden sm:block absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 bg-beige hover:bg-mandai-green text-mandai-green hover:text-beige p-2 lg:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 border border-mandai-green"
                    aria-label="Next update"
                  >
                    <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6 text-black" />
                  </button>

                  {/* Dots Indicator */}
                  <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
                    {blogs.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 border border-mandai-green ${
                          index === currentIndex 
                            ? 'bg-[#003400] scale-125' 
                            : 'bg-beige hover:bg-mandai-green'
                        }`}
                        aria-label={`Go to update ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Mobile Swipe Indicator */}
                  <div className="block sm:hidden text-center mt-3">
                    <p className="text-xs text-gray-500">
                      Swipe left or right to navigate
                    </p>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="relative inline-block mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto shadow-xl bg-mandai-green">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-beige" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-mandai-green">
              No Articles Available
            </h3>
            <p className="text-sm sm:text-base opacity-75 text-black px-4">
              We&apos;re working on bringing you the latest updates and articles.
            </p>
          </div>
        )}
      </div>
    </section>
  );
} 