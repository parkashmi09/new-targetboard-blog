'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function StudyMaterials() {
    const [activeTab, setActiveTab] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDesktop, setIsDesktop] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const carouselRef = useRef(null);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Handle mounting to prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categoriesWithSubcategories`);
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                const reversedCategories = data.categories.reverse() || [];
                setCategories(reversedCategories);
                
                // Set first category as default active tab
                if (reversedCategories.length > 0) {
                    const firstTabId = reversedCategories[0].name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                    setActiveTab(firstTabId);
                }
                
                setError(null);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError(err.message);
                // Fallback to empty array if API fails
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Generate tabs from categories data
    const getTabIcon = (categoryName) => {
        const icons = {
            'Quiz': '🧠',
            'UG': '🎓',
            'CLAT': '⚖️',
            'NDA': '🪖',
            'CAT': '📊',
            'CUET': '🎯',
            'NEET': '🏥',
            'JEE': '🔬',
            'CBSE': '📚',
            'Books & Sol': '📖',
            'NCERT': '📘',
            'State Books': '🏛️'
        };
        return icons[categoryName] || '📚';
    };

    const getTabColor = (categoryName) => {
        const colors = {
            'Quiz': '#6366F1',
            'UG': '#F59E0B',
            'CLAT': '#EF4444',
            'NDA': '#10B981',
            'CAT': '#8B5CF6',
            'CUET': '#F97316',
            'NEET': '#10B981',
            'JEE': '#EF4444',
            'CBSE': '#3B82F6',
            'Books & Sol': '#F59E0B',
            'NCERT': '#8B5CF6',
            'State Books': '#6366F1'
        };
        return colors[categoryName] || '#6B7280';
    };

    // Get materials (subcategories) for active category
    const getActiveCategoryMaterials = () => {
        // Show subcategories for selected category
        const selectedCategory = categories.find(cat => 
            cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === activeTab
        );
        
        if (selectedCategory) {
            if (selectedCategory.subcategories.length > 0) {
                return selectedCategory.subcategories.map((subcategory) => ({
                    id: subcategory._id, // Use actual subcategory ID for navigation
                    name: subcategory.name,
                    category: selectedCategory.name,
                    categoryIcon: getTabIcon(selectedCategory.name),
                    categoryColor: getTabColor(selectedCategory.name)
                }));
            } else {
                // If no subcategories, show the category itself
                return [{
                    id: `${activeTab}-main`,
                    name: selectedCategory.name,
                    category: selectedCategory.name,
                    categoryIcon: getTabIcon(selectedCategory.name),
                    categoryColor: getTabColor(selectedCategory.name)
                }];
            }
        }
        return [];
    };

    const filteredMaterials = getActiveCategoryMaterials();

    // Check screen size - only after mounting
    useEffect(() => {
        if (!isMounted) return;
        
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, [isMounted]);

    // Auto-play carousel - only after mounting
    useEffect(() => {
        if (!isMounted || !isDesktop && isAutoPlaying && filteredMaterials.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % filteredMaterials.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [isMounted, isDesktop, isAutoPlaying, filteredMaterials.length]);

    // Reset slide when tab changes
    useEffect(() => {
        setCurrentSlide(0);
    }, [activeTab]);

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % filteredMaterials.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + filteredMaterials.length) % filteredMaterials.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
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

    const MaterialCard = ({ material, index }) => (
        <Link href={`/study-material/${material.id}`}>
            <div
                className="group relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer bg-white"
                style={{
                    animationDelay: `${index * 100}ms`
                }}
            >
                {/* Gradient Overlay */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                        background: `linear-gradient(135deg, ${material.categoryColor}, ${material.categoryColor}80)`
                    }}
                ></div>

                {/* Top Section */}
                <div className="relative p-6">
                    {/* Category Badge */}
                    <div className="flex items-center justify-center mb-4">
                        <span
                            className="px-3 py-1 rounded-full text-white text-sm font-semibold shadow-md"
                            style={{ backgroundColor: material.categoryColor }}
                        >
                            {material.category}
                        </span>
                    </div>

                    {/* Icon */}
                    <div className="flex items-center justify-center mb-4">
                        <div
                            className="w-16 h-16 rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300"
                            style={{ backgroundColor: `${material.categoryColor}15` }}
                        >
                            <span className="text-2xl">{material.categoryIcon}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold mb-3 text-center group-hover:text-green-600 transition-colors" style={{ color: '#003400' }}>
                        {material.name}
                    </h3>
                    
                    <p className="text-gray-600 text-center mb-4 leading-relaxed text-sm">
                        Study materials and resources for {material.name}
                    </p>
                </div>

                {/* Action Button */}
                <div className="p-4 pt-0">
                    <div className="w-full flex items-center justify-center px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 transform group-hover:scale-105 hover:shadow-lg" style={{ backgroundColor: '#003400', color: 'white' }}>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Explore {material.name}
                    </div>
                </div>

                {/* Hover Glow Effect */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg"
                    style={{ backgroundColor: material.categoryColor }}
                ></div>
            </div>
        </Link>
    );

    return (
        <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#003400' }}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-5 animate-pulse" style={{ backgroundColor: '#FAEBCE' }}></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-5 animate-pulse delay-1000" style={{ backgroundColor: '#FAF5E9' }}></div>
                <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full opacity-5 animate-bounce delay-500" style={{ backgroundColor: '#FAEBCE' }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <div className="relative">
                            <h2 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#FFD600', letterSpacing: '-0.03em' }}>
                                Study Categories
                            </h2>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 rounded-full" style={{ background: '#FFD600' }}></div>
                        </div>
                    </div>
                    <p className="text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed" style={{ color: '#FAEBCE' }}>
                        Browse through our comprehensive collection of study materials organized by categories and subjects.
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-16">
                        <div className="relative inline-block mb-6">
                            <div className="w-16 h-16 rounded-full border-4 border-opacity-20 border-white animate-spin" style={{ borderTopColor: '#FFD600' }}></div>
                        </div>
                        <h3 className="text-xl font-bold mb-3" style={{ color: '#FAEBCE' }}>
                            Loading Categories...
                        </h3>
                        <p className="text-base opacity-75" style={{ color: '#FAEBCE' }}>
                            Fetching study categories from our database
                        </p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="text-center py-16">
                        <div className="relative inline-block mb-6">
                            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-xl" style={{ backgroundColor: '#EF4444' }}>
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-3" style={{ color: '#FAEBCE' }}>
                            Failed to Load Categories
                        </h3>
                        <p className="text-base opacity-75 mb-6" style={{ color: '#FAEBCE' }}>
                            {error}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                            style={{ backgroundColor: '#FAEBCE', color: '#003400' }}
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Main Content - Only show when not loading and no error */}
                {!loading && !error && (
                    <>
                        {/* Horizontal Categories Strip Carousel */}
                        <div className="mb-8">
                            <div className="overflow-x-auto scrollbar-hide p-2">
                                <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
                                    {/* Category Tabs */}
                                    {categories.map((category) => {
                                        const tabId = category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                                        const isActive = activeTab === tabId;

                                        return (
                                            <button
                                                key={tabId}
                                                onClick={() => setActiveTab(tabId)}
                                                className={`flex-shrink-0 flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${isActive
                                                        ? 'text-black shadow-xl scale-105'
                                                        : 'text-white border-2 border-opacity-30 hover:border-opacity-60'
                                                    }`}
                                                style={{
                                                    backgroundColor: isActive ? '#FAEBCE' : 'transparent',
                                                    borderColor: '#FAEBCE',
                                                    minWidth: '140px'
                                                }}
                                            >
                                                <span className="text-lg mr-2">{getTabIcon(category.name)}</span>
                                                <span className="font-jakarta text-sm">{category.name}</span>
                                                {category.subcategories.length > 0 && (
                                                    <span className="ml-2 text-xs opacity-60 bg-black bg-opacity-20 px-2 py-1 rounded-full">
                                                        {category.subcategories.length}
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Materials Display - Desktop Grid / Mobile Carousel */}
                        {!isMounted ? (
                            // Show desktop grid by default during SSR to prevent hydration mismatch
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredMaterials.map((material, index) => (
                                    <MaterialCard key={material.id} material={material} index={index} />
                                ))}
                            </div>
                        ) : isDesktop ? (
                            // Desktop Grid Layout
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredMaterials.map((material, index) => (
                                    <MaterialCard key={material.id} material={material} index={index} />
                                ))}
                            </div>
                        ) : (
                            // Mobile Carousel Layout
                            <div className="relative">
                                {/* Carousel Container */}
                                <div
                                    className="overflow-hidden rounded-2xl"
                                    onTouchStart={onTouchStart}
                                    onTouchMove={onTouchMove}
                                    onTouchEnd={onTouchEnd}
                                    ref={carouselRef}
                                >
                                    <div
                                        className="flex transition-transform duration-500 ease-out"
                                        style={{
                                            transform: `translateX(-${currentSlide * 100}%)`,
                                        }}
                                    >
                                        {filteredMaterials.map((material, index) => (
                                            <div key={material.id} className="w-full flex-shrink-0 px-2">
                                                <MaterialCard material={material} index={index} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {filteredMaterials.length > 1 && (
                                    <>
                                        {/* Navigation Arrows */}
                                        <button
                                            onClick={prevSlide}
                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
                                            style={{ backgroundColor: '#FAEBCE', color: '#003400' }}
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={nextSlide}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
                                            style={{ backgroundColor: '#FAEBCE', color: '#003400' }}
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>

                                        {/* Dots Indicator */}
                                        <div className="flex justify-center space-x-2 mt-6">
                                            {filteredMaterials.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => goToSlide(idx)}
                                                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${idx === currentSlide
                                                            ? 'scale-125 shadow-lg'
                                                            : 'opacity-50 hover:opacity-75'
                                                        }`}
                                                    style={{
                                                        backgroundColor: idx === currentSlide ? '#FFD600' : '#FAEBCE'
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        {/* Slide Counter */}
                                        <div className="text-center mt-4">
                                            <span className="text-sm font-medium" style={{ color: '#FAEBCE' }}>
                                                {currentSlide + 1} of {filteredMaterials.length}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Enhanced Empty State */}
                        {filteredMaterials.length === 0 && !loading && (
                            <div className="text-center py-16">
                                <div className="relative inline-block mb-6">
                                    <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-xl" style={{ backgroundColor: '#FAEBCE' }}>
                                        <svg className="w-12 h-12" style={{ color: '#003400' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ backgroundColor: '#FAEBCE' }}></div>
                                </div>
                                <h3 className="text-xl font-bold mb-3" style={{ color: '#FAEBCE' }}>
                                    No materials found
                                </h3>
                                <p className="text-base opacity-75 mb-6" style={{ color: '#FAEBCE' }}>
                                    We&apos;re working on adding more materials for this category.
                                </p>
                                {categories.length > 0 && (
                                    <button
                                        onClick={() => {
                                            const firstTabId = categories[0].name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                                            setActiveTab(firstTabId);
                                        }}
                                        className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                        style={{ backgroundColor: '#FAEBCE', color: '#003400' }}
                                    >
                                        Browse Categories
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>

            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}