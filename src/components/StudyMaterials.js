'use client'
import React, { useState, useEffect, useRef } from 'react';

export default function StudyMaterials() {
    const [activeTab, setActiveTab] = useState('all');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDesktop, setIsDesktop] = useState(true);
    const carouselRef = useRef(null);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const tabs = [
        { id: 'all', name: 'All Materials', icon: '📚', color: '#6366F1' },
        { id: 'cbse', name: 'NCERT Books', icon: '📖', color: '#F59E0B' },
        { id: 'jee', name: 'JEE', icon: '🔬', color: '#EF4444' },
        { id: 'neet', name: 'NEET', icon: '🏥', color: '#10B981' },
        { id: 'cuet', name: 'CUET', icon: '🎓', color: '#8B5CF6' },
    ];

    // Mock data for demonstration
    const mockStudyMaterials = [
        {
            id: 1,
            title: "Physics Formula Sheet",
            description: "Complete physics formulas for JEE preparation with solved examples and practice problems",
            category: "jee",
            downloads: "12.5K",
            rating: 4.8,
            pages: 45,
            pdfUrl: "#",
            subject: "Physics",
            level: "Advanced"
        },
        {
            id: 2,
            title: "NCERT Chemistry Class 12",
            description: "Complete NCERT Chemistry textbook with additional notes and practice questions",
            category: "cbse",
            downloads: "8.2K",
            rating: 4.9,
            pages: 280,
            pdfUrl: "#",
            subject: "Chemistry",
            level: "Intermediate"
        },
        {
            id: 3,
            title: "Biology Quick Notes",
            description: "Comprehensive biology notes covering all NEET topics with diagrams and illustrations",
            category: "neet",
            downloads: "15.7K",
            rating: 4.7,
            pages: 120,
            pdfUrl: "#",
            subject: "Biology",
            level: "Advanced"
        },
        {
            id: 4,
            title: "Mathematics Handbook",
            description: "Essential mathematics concepts and formulas for competitive exam preparation",
            category: "cuet",
            downloads: "9.3K",
            rating: 4.6,
            pages: 85,
            pdfUrl: "#",
            subject: "Mathematics",
            level: "Intermediate"
        },
        {
            id: 5,
            title: "English Grammar Guide",
            description: "Complete English grammar guide with exercises and practice tests for all competitive exams",
            category: "cuet",
            downloads: "6.8K",
            rating: 4.5,
            pages: 95,
            pdfUrl: "#",
            subject: "English",
            level: "Basic"
        },
        {
            id: 6,
            title: "Organic Chemistry Notes",
            description: "Detailed organic chemistry notes with reaction mechanisms and practice problems",
            category: "jee",
            downloads: "11.2K",
            rating: 4.8,
            pages: 156,
            pdfUrl: "#",
            subject: "Chemistry",
            level: "Advanced"
        }
    ];

    const filteredMaterials = activeTab === 'all'
        ? mockStudyMaterials
        : mockStudyMaterials.filter(material =>
            material.category.toLowerCase() === activeTab
        );

    // Check screen size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Auto-play carousel
    useEffect(() => {
        if (!isDesktop && isAutoPlaying && filteredMaterials.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % filteredMaterials.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [isDesktop, isAutoPlaying, filteredMaterials.length]);

    // Reset slide when tab changes
    useEffect(() => {
        setCurrentSlide(0);
    }, [activeTab]);

    const getSubjectColor = (subject) => {
        const colors = {
            'Physics': '#3B82F6',
            'Chemistry': '#EF4444',
            'Biology': '#10B981',
            'Mathematics': '#8B5CF6',
            'English': '#F59E0B'
        };
        return colors[subject] || '#6B7280';
    };

    const getLevelColor = (level) => {
        const colors = {
            'Basic': '#10B981',
            'Intermediate': '#F59E0B',
            'Advanced': '#EF4444'
        };
        return colors[level] || '#6B7280';
    };

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
                    background: `linear-gradient(135deg, ${getSubjectColor(material.subject)}, ${getLevelColor(material.level)})`
                }}
            ></div>

            {/* Top Section */}
            <div className="relative p-4">
                {/* Subject Badge */}
                <div className="flex items-center justify-between mb-3">
                    <span
                        className="px-2 py-1 rounded-full text-white text-xs font-semibold shadow-md"
                        style={{ backgroundColor: getSubjectColor(material.subject) }}
                    >
                        {material.subject}
                    </span>
                    <span
                        className="px-2 py-1 rounded-full text-white text-xs font-medium"
                        style={{ backgroundColor: getLevelColor(material.level) }}
                    >
                        {material.level}
                    </span>
                </div>

                {/* Icon */}
                <div className="flex items-center justify-center mb-3">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: `${getSubjectColor(material.subject)}15` }}
                    >
                        <svg
                            className="w-6 h-6"
                            style={{ color: getSubjectColor(material.subject) }}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                        </svg>
                    </div>
                </div>

                {/* Content */}
                <h3 className="text-base font-bold mb-2 text-center group-hover:text-green-600 transition-colors" style={{ color: '#003400' }}>
                    {material.title}
                </h3>
                <p className="text-gray-600 text-center mb-3 leading-relaxed text-sm line-clamp-2">
                    {material.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <svg className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <span className="text-xs font-semibold text-gray-700">{material.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">Rating</span>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <svg className="w-3 h-3 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M5 4v3h5.5v12h3V7H19V4H5z" />
                            </svg>
                            <span className="text-xs font-semibold text-gray-700">{material.pages}</span>
                        </div>
                        <span className="text-xs text-gray-500">Pages</span>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z" />
                            </svg>
                            <span className="text-xs font-semibold text-gray-700">{material.downloads}</span>
                        </div>
                        <span className="text-xs text-gray-500">Downloads</span>
                    </div>
                </div>
            </div>

            {/* Single Action Button */}
            <div className="p-4 pt-0">
                <button className="w-full flex items-center justify-center px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg" style={{ backgroundColor: '#003400', color: 'white' }}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Material
                </button>
            </div>

            {/* Hover Glow Effect */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg"
                style={{ backgroundColor: getSubjectColor(material.subject) }}
            ></div>
        </div>
    );

    return (
        <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#003400' }}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-5 animate-pulse" style={{ backgroundColor: '#FAEBCE' }}></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-5 animate-pulse delay-1000" style={{ backgroundColor: '#FAF5E9' }}></div>
                <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full opacity-5 animate-bounce delay-500" style={{ backgroundColor: '#FAEBCE' }}></div>

                {/* Floating Icons */}
                <div className="absolute top-32 right-20 opacity-10 animate-float delay-300">
                    <svg className="w-8 h-8" style={{ color: '#FAEBCE' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                </div>
                <div className="absolute bottom-40 left-16 opacity-10 animate-float delay-700">
                    <svg className="w-6 h-6" style={{ color: '#FAEBCE' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                    </svg>
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <div className="relative">
                            <h2 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#FFD600', letterSpacing: '-0.03em' }}>
                                FREE Study Materials
                            </h2>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 rounded-full" style={{ background: '#FFD600' }}></div>
                        </div>
                    </div>
                    <p className="text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed" style={{ color: '#FAEBCE' }}>
                        Access premium quality study resources for{' '}
                        <span className="font-bold text-yellow-400">free</span>. Download instantly or view online with interactive features.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
                        <div className="text-center p-3 rounded-xl border border-opacity-20" style={{ borderColor: '#FAEBCE' }}>
                            <div className="text-2xl font-bold text-yellow-400">500+</div>
                            <div className="text-xs opacity-75" style={{ color: '#FAEBCE' }}>Study Materials</div>
                        </div>
                        <div className="text-center p-3 rounded-xl border border-opacity-20" style={{ borderColor: '#FAEBCE' }}>
                            <div className="text-2xl font-bold text-yellow-400">100K+</div>
                            <div className="text-xs opacity-75" style={{ color: '#FAEBCE' }}>Downloads</div>
                        </div>
                        <div className="text-center p-3 rounded-xl border border-opacity-20" style={{ borderColor: '#FAEBCE' }}>
                            <div className="text-2xl font-bold text-yellow-400">50+</div>
                            <div className="text-xs opacity-75" style={{ color: '#FAEBCE' }}>Subjects</div>
                        </div>
                        <div className="text-center p-3 rounded-xl border border-opacity-20" style={{ borderColor: '#FAEBCE' }}>
                            <div className="text-2xl font-bold text-yellow-400">4.8★</div>
                            <div className="text-xs opacity-75" style={{ color: '#FAEBCE' }}>Average Rating</div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`group relative flex items-center px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${activeTab === tab.id
                                    ? 'text-black shadow-xl scale-105'
                                    : 'text-white border-2 border-opacity-30 hover:border-opacity-60'
                                }`}
                            style={{
                                backgroundColor: activeTab === tab.id ? '#FAEBCE' : 'transparent',
                                borderColor: activeTab === tab.id ? '#FAEBCE' : '#FAEBCE',
                                minWidth: '140px',
                                animationDelay: `${index * 100}ms`
                            }}
                        >
                            {/* Glow Effect */}
                            {activeTab === tab.id && (
                                <div
                                    className="absolute inset-0 rounded-xl opacity-20 blur-lg"
                                    style={{ backgroundColor: '#FAEBCE' }}
                                ></div>
                            )}

                            <span className="text-lg mr-2 group-hover:animate-bounce">{tab.icon}</span>
                            <span className="relative font-jakarta text-sm">{tab.name}</span>

                            {/* Active indicator */}
                            {activeTab === tab.id && (
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: '#003400' }}></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Materials Display - Desktop Grid / Mobile Carousel */}
                {isDesktop ? (
                    // Desktop Grid Layout
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                                    {filteredMaterials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                index === currentSlide 
                                                    ? 'scale-125 shadow-lg' 
                                                    : 'opacity-50 hover:opacity-75'
                                            }`}
                                            style={{ 
                                                backgroundColor: index === currentSlide ? '#FFD600' : '#FAEBCE'
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
                {filteredMaterials.length === 0 && (
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
                        <button
                            onClick={() => setActiveTab('all')}
                            className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                            style={{ backgroundColor: '#FAEBCE', color: '#003400' }}
                        >
                            View All Materials
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes gradient-x {
                    0%, 100% { background-size: 200% 200%; background-position: left center; }
                    50% { background-size: 200% 200%; background-position: right center; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-gradient-x {
                    animation: gradient-x 3s ease infinite;
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
}