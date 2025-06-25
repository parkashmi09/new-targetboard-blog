import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FlaskConical, Stethoscope, BookOpen, GraduationCap, Briefcase, Landmark, ChevronLeft, ChevronRight } from 'lucide-react';

const iconMap = {
  'All Exam': BookOpen,
  'CBSE': GraduationCap,
  'CUET Exam': Briefcase,
  'NEET': Stethoscope,
  'JEE': FlaskConical,
  'Default': Landmark,
};

export default function Categories() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://blog-backend-lv3o.onrender.com/api/v1/blog-category');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const result = await response.json();
        setCategories(result.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === categories.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? categories.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getIcon = (categoryName) => {
    return iconMap[categoryName] || iconMap['Default'];
  };

  return (
    <section className="py-16 bg-gradient-to-br from-[#FAEBCE] to-[#F5E6B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#003400] mb-6 font-jakarta">
            Explore Categories
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 font-jakarta max-w-3xl mx-auto">
            Discover comprehensive study materials and resources tailored for your exam preparation journey
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full border-4 border-opacity-20 border-[#003400] animate-spin mx-auto mb-8" style={{ borderTopColor: '#003400' }}></div>
            <h3 className="text-2xl font-bold text-[#003400] mb-4 font-jakarta">Loading Categories...</h3>
            <p className="text-gray-600 text-lg">Fetching exam categories from our database</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <div className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl bg-red-500">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#003400] mb-4 font-jakarta">Failed to Load Categories</h3>
            <p className="text-gray-600 mb-8 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-[#003400] text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Retry
            </button>
          </div>
        )}

        {/* Categories - Only show when not loading and no error */}
        {!loading && !error && categories.length > 0 && (
          <>
            {/* Categories - Mobile Carousel / Desktop Grid */}
            {isMobile ? (
              <div className="relative mb-12">
                {/* Carousel Container */}
                <div className="overflow-hidden rounded-3xl">
                  <div 
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {categories.map((category) => {
                      const Icon = getIcon(category.name);
                      return (
                        <div key={category._id} className="w-full flex-shrink-0 px-2">
                          <Link
                            href={`/category/${category._id}`}
                            className="group relative block rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 border-2 border-white/20 bg-white"
                          >
                            {/* Background Image */}
                            <div className="relative h-80">
                              <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover object-center group-hover:scale-110 transition-transform duration-500 z-0"
                                loading="lazy"
                              />
                              {/* Enhanced Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                              {/* Content */}
                              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center">
                                <div className="mb-6 bg-white/95 backdrop-blur-sm rounded-full p-5 shadow-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                  <Icon className="h-12 w-12 text-[#003400]" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4 font-jakarta drop-shadow-lg">
                                  {category.name}
                                </h3>
                                <p className="text-white/90 mb-6 font-jakarta leading-relaxed text-lg drop-shadow-md">
                                  {category.description}
                                </p>
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/95 backdrop-blur-sm text-[#003400] rounded-full group-hover:bg-[#003400] group-hover:text-white transition-all duration-300 shadow-xl">
                                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Arrows - Only show if multiple categories */}
                {categories.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm text-[#003400] rounded-full p-3 shadow-2xl hover:bg-[#003400] hover:text-white transition-all duration-300 z-30"
                      aria-label="Previous category"
                    >
                      <ChevronLeft className="h-7 w-7" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm text-[#003400] rounded-full p-3 shadow-2xl hover:bg-[#003400] hover:text-white transition-all duration-300 z-30"
                      aria-label="Next category"
                    >
                      <ChevronRight className="h-7 w-7" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center mt-8 space-x-3">
                      {categories.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-4 h-4 rounded-full transition-all duration-300 ${
                            index === currentSlide 
                              ? 'bg-[#003400] scale-125 shadow-lg' 
                              : 'bg-[#003400]/40 hover:bg-[#003400]/70'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Desktop Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
                {categories.map((category) => {
                  const Icon = getIcon(category.name);
                  return (
                    <Link
                      key={category._id}
                      href={`/category/${category._id}`}
                      className="group relative rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-white/20 bg-white"
                    >
                      {/* Background Image */}
                      <div className="relative h-80">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover object-center group-hover:scale-110 transition-transform duration-500 z-0"
                          loading="lazy"
                        />
                        {/* Enhanced Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                        {/* Content */}
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center">
                          <div className="mb-6 bg-white/95 backdrop-blur-sm rounded-full p-5 shadow-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                            <Icon className="h-12 w-12 text-[#003400]" />
                          </div>
                          <h3 className="text-3xl font-bold text-white mb-4 font-jakarta drop-shadow-lg">
                            {category.name}
                          </h3>
                          <p className="text-white/90 mb-6 font-jakarta leading-relaxed text-lg drop-shadow-md">
                            {category.description}
                          </p>
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/95 backdrop-blur-sm text-[#003400] rounded-full group-hover:bg-[#003400] group-hover:text-white transition-all duration-300 shadow-xl">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && categories.length === 0 && (
          <div className="text-center py-20">
            <div className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl bg-[#003400]">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#003400] mb-4 font-jakarta">No Categories Available</h3>
            <p className="text-gray-600 text-lg">We&apos;re working on adding exam categories.</p>
          </div>
        )}

        {/* Additional Features - Only show when categories are loaded */}
        {!loading && !error && categories.length > 0 && (
          <>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-[#003400] to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-[#003400] mb-3 font-jakarta">
                  NCERT Books
                </h3>
                <p className="text-gray-600 font-jakarta text-lg leading-relaxed">
                  Complete textbooks for classes 6-12 with detailed explanations
                </p>
              </div>

              <div className="text-center bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-[#003400] mb-3 font-jakarta">
                  Previous Papers
                </h3>
                <p className="text-gray-600 font-jakarta text-lg leading-relaxed">
                  Solved question papers with detailed explanations and solutions
                </p>
              </div>

              <div className="text-center bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-[#003400] mb-3 font-jakarta">
                  Quick Access
                </h3>
                <p className="text-gray-600 font-jakarta text-lg leading-relaxed">
                  Instant access to all study materials with smart organization
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-20">
              <Link
                href="/study-materials"
                className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-[#003400] to-green-600 text-white rounded-2xl font-bold text-xl font-jakarta shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:from-green-600 hover:to-[#003400]"
              >
                Browse All Study Materials
                <svg className="ml-4 h-7 w-7 text-white transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}