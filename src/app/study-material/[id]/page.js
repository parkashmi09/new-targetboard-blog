'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function StudyMaterialPage() {
  const { id } = useParams();
  const [subcategory, setSubcategory] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [carousels, setCarousels] = useState([]);
  const [expandedCarousel, setExpandedCarousel] = useState(null);
  const [subCarousels, setSubCarousels] = useState({});
  const [expandedSubCarousel, setExpandedSubCarousel] = useState(null);
  const [studyMaterials, setStudyMaterials] = useState({});
  const [loading, setLoading] = useState(true);
  const [classesLoading, setClassesLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});

  // Fetch subcategory details and classes
  useEffect(() => {
    if (!id) return;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch classes for this subcategory
        const classesResponse = await fetch(`https://plankton-app-ankop.ondigitalocean.app/api/v1/subcategory/${id}/classes`);
        const classesData = await classesResponse.json();
        
        if (classesData.classes && classesData.classes.length > 0) {
          setClasses(classesData.classes);
          // Auto-select first class
          setSelectedClass(classesData.classes[0]);
          
          // Fetch carousels for the first class
          const carouselsResponse = await fetch(`https://plankton-app-ankop.ondigitalocean.app/api/v1/class/${classesData.classes[0]._id}/carousels`);
          const carouselsData = await carouselsResponse.json();
          setCarousels(carouselsData.carousels || []);
        }
        
        // Try to get subcategory name from categories API
        const categoriesResponse = await fetch('https://blog-backend-lv3o.onrender.com/api/v1/categoriesWithSubcategories');
        const categoriesData = await categoriesResponse.json();
        
        // Find the subcategory name
        for (const category of categoriesData.categories) {
          const foundSubcategory = category.subcategories?.find(sub => sub._id === id);
          if (foundSubcategory) {
            setSubcategory({ name: foundSubcategory.name, categoryName: category.name });
            break;
          }
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle class selection
  const handleClassSelect = async (classItem) => {
    setSelectedClass(classItem);
    setClassesLoading(true);
    setExpandedCarousel(null);
    setExpandedSubCarousel(null);
    setSubCarousels({});
    setStudyMaterials({});
    
    try {
      const carouselsResponse = await fetch(`https://plankton-app-ankop.ondigitalocean.app/api/v1/class/${classItem._id}/carousels`);
      const carouselsData = await carouselsResponse.json();
      setCarousels(carouselsData.carousels || []);
    } catch (error) {
      console.error('Error fetching carousels:', error);
      setCarousels([]);
    } finally {
      setClassesLoading(false);
    }
  };

  // Handle carousel expansion
  const handleCarouselToggle = async (carousel) => {
    if (expandedCarousel === carousel._id) {
      setExpandedCarousel(null);
      setExpandedSubCarousel(null);
      return;
    }

    setExpandedCarousel(carousel._id);
    setExpandedSubCarousel(null);
    
    // Check if we already have sub-carousels loaded
    if (subCarousels[carousel._id]) {
      return;
    }

    // Fetch sub-carousels
    setLoadingStates(prev => ({ ...prev, [`carousel-${carousel._id}`]: true }));
    try {
      const response = await fetch(`https://plankton-app-ankop.ondigitalocean.app/api/v1/get/carousels/${carousel._id}/sub`);
      const data = await response.json();
      setSubCarousels(prev => ({
        ...prev,
        [carousel._id]: data.crousel || []
      }));
    } catch (error) {
      console.error('Error fetching sub-carousels:', error);
      setSubCarousels(prev => ({
        ...prev,
        [carousel._id]: []
      }));
    } finally {
      setLoadingStates(prev => ({ ...prev, [`carousel-${carousel._id}`]: false }));
    }
  };

  // Handle sub-carousel expansion
  const handleSubCarouselToggle = async (subCarousel) => {
    if (expandedSubCarousel === subCarousel._id) {
      setExpandedSubCarousel(null);
      return;
    }

    setExpandedSubCarousel(subCarousel._id);
    
    // Check if we already have study materials loaded
    if (studyMaterials[subCarousel._id]) {
      return;
    }

    // Fetch study materials
    setLoadingStates(prev => ({ ...prev, [`subcarousel-${subCarousel._id}`]: true }));
    try {
      const response = await fetch(`https://plankton-app-ankop.ondigitalocean.app/api/v1/get-study-material?subCarouselId=${subCarousel._id}`);
      const data = await response.json();
      setStudyMaterials(prev => ({
        ...prev,
        [subCarousel._id]: data || []
      }));
    } catch (error) {
      console.error('Error fetching study materials:', error);
      setStudyMaterials(prev => ({
        ...prev,
        [subCarousel._id]: []
      }));
    } finally {
      setLoadingStates(prev => ({ ...prev, [`subcarousel-${subCarousel._id}`]: false }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF5E9' }}>
        <div className="text-2xl font-bold" style={{ color: '#003400' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF5E9' }}>
      {/* Header with breadcrumb */}
      <div className="pt-20 sm:pt-24 md:pt-32 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm mb-4 sm:mb-6 overflow-x-auto" style={{ color: '#003400' }}>
            <Link href="/" className="hover:underline whitespace-nowrap">Home</Link>
            <span>/</span>
            <span className="whitespace-nowrap">{subcategory?.categoryName || 'Study Material'}</span>
            <span>/</span>
            <span className="font-semibold whitespace-nowrap">{subcategory?.name || 'Study Material'} 2025-26 Class 12th to 1st PDF Download</span>
          </nav>

          {/* Main heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight" style={{ color: '#003400' }}>
            {subcategory?.name || 'Study Material'} 2025-26 Class 12th to 1st
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-4xl leading-relaxed" style={{ color: '#1F1E1D' }}>
            {subcategory?.name || 'Board'} managed and designed textbooks of all the subjects in such a way to 
            provide the students with ease during the time of exam preparation. On the 
            platform, we are sharing {subcategory?.name || 'study'} materials for all classes from 1st to 12th.
          </p>

          <Link 
            href="#materials" 
            className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-200 hover:opacity-90"
            style={{ backgroundColor: '#003400', color: '#FFFFFF' }}
          >
            Read More
          </Link>
        </div>
      </div>

      {/* Class Selection Tabs */}
      {classes.length > 0 && (
        <div className="py-2" style={{ backgroundColor: '#FAEBCE' }}>
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto scrollbar-hide">
              {/* Left arrow */}
              <button className="flex-shrink-0 p-1.5 sm:p-2 rounded-full" style={{ backgroundColor: '#FFFFFF' }}>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#003400' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Class buttons */}
              <div className="flex space-x-2 sm:space-x-3 p-2 overflow-x-auto scrollbar-hide">
                {classes.map((classItem) => (
                  <button
                    key={classItem._id}
                    onClick={() => handleClassSelect(classItem)}
                    className={`flex-shrink-0 px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                      selectedClass?._id === classItem._id 
                        ? 'shadow-lg transform scale-105' 
                        : 'hover:shadow-md hover:transform hover:scale-102'
                    }`}
                    style={{
                      backgroundColor: selectedClass?._id === classItem._id ? '#003400' : '#FFFFFF',
                      color: selectedClass?._id === classItem._id ? '#FFFFFF' : '#003400',
                      border: `2px solid ${selectedClass?._id === classItem._id ? '#003400' : 'transparent'}`,
                      minWidth: '60px'
                    }}
                  >
                    {classItem.name}
                  </button>
                ))}
              </div>

              {/* Right arrow */}
              <button className="flex-shrink-0 p-1.5 sm:p-2 rounded-full" style={{ backgroundColor: '#FFFFFF' }}>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#003400' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Study Materials Accordion */}
      <div id="materials" className="py-6 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {classesLoading ? (
            <div className="flex items-center justify-center py-8 sm:py-12">
              <div className="text-lg sm:text-xl font-semibold" style={{ color: '#003400' }}>Loading materials...</div>
            </div>
          ) : (
            <>
              {carousels.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {carousels.map((carousel) => (
                    <div key={carousel._id} className="bg-white rounded-lg shadow-md overflow-hidden border" style={{ borderColor: '#FAEBCE' }}>
                      {/* Main Carousel Header */}
                      <button
                        onClick={() => handleCarouselToggle(carousel)}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-opacity-50 transition-colors duration-200"
                        style={{ backgroundColor: expandedCarousel === carousel._id ? '#FAEBCE' : '#FFFFFF' }}
                      >
                        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                          <div 
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: '#003400' }}
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#FFFFFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-sm sm:text-lg truncate" style={{ color: '#003400' }}>
                              {carousel.name}
                            </h3>
                            <p className="text-xs sm:text-sm truncate" style={{ color: '#1F1E1D' }}>
                              {selectedClass?.name} class materials
                            </p>
                          </div>
                        </div>
                        <svg 
                          className={`w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-200 flex-shrink-0 ${expandedCarousel === carousel._id ? 'rotate-180' : ''}`}
                          style={{ color: '#003400' }}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Sub-carousels */}
                      {expandedCarousel === carousel._id && (
                        <div className="border-t" style={{ borderColor: '#FAEBCE' }}>
                          {loadingStates[`carousel-${carousel._id}`] ? (
                            <div className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                              <div className="text-xs sm:text-sm" style={{ color: '#003400' }}>Loading topics...</div>
                            </div>
                          ) : (
                            <>
                              {subCarousels[carousel._id] && subCarousels[carousel._id].length > 0 ? (
                                <div className="space-y-0">
                                  {subCarousels[carousel._id].map((subCarousel) => (
                                    <div key={subCarousel._id}>
                                      {/* Sub-carousel Header */}
                                      <button
                                        onClick={() => handleSubCarouselToggle(subCarousel)}
                                        className="w-full px-6 sm:px-8 py-2.5 sm:py-3 text-left flex items-center justify-between hover:bg-opacity-30 transition-colors duration-200 border-t"
                                        style={{ 
                                          backgroundColor: expandedSubCarousel === subCarousel._id ? '#FAF5E9' : '#FFFFFF',
                                          borderColor: '#FAEBCE'
                                        }}
                                      >
                                        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                                          <div 
                                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: '#FAEBCE' }}
                                          >
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: '#003400' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                          </div>
                                          <span className="font-medium text-xs sm:text-base truncate" style={{ color: '#003400' }}>
                                            {subCarousel.name}
                                          </span>
                                        </div>
                                        <svg 
                                          className={`w-3 h-3 sm:w-4 sm:h-4 transform transition-transform duration-200 flex-shrink-0 ${expandedSubCarousel === subCarousel._id ? 'rotate-180' : ''}`}
                                          style={{ color: '#003400' }}
                                          fill="none" 
                                          stroke="currentColor" 
                                          viewBox="0 0 24 24"
                                        >
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                      </button>

                                      {/* Study Materials */}
                                      {expandedSubCarousel === subCarousel._id && (
                                        <div className="px-6 sm:px-10 py-3 sm:py-4 bg-white border-t" style={{ borderColor: '#FAEBCE' }}>
                                          {loadingStates[`subcarousel-${subCarousel._id}`] ? (
                                            <div className="text-center py-3 sm:py-4">
                                              <div className="text-xs sm:text-sm" style={{ color: '#003400' }}>Loading study materials...</div>
                                            </div>
                                          ) : (
                                            <>
                                              {studyMaterials[subCarousel._id] && studyMaterials[subCarousel._id].length > 0 ? (
                                                <div className="space-y-2 sm:space-y-3">
                                                  {studyMaterials[subCarousel._id].map((material) => (
                                                    <div key={material._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg border hover:shadow-md transition-shadow duration-200 space-y-3 sm:space-y-0" style={{ backgroundColor: '#FAF5E9', borderColor: '#FAEBCE' }}>
                                                      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                                                        <div 
                                                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                                                          style={{ backgroundColor: '#003400' }}
                                                        >
                                                          <svg className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#FFFFFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                          </svg>
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                          <h4 className="font-semibold text-sm sm:text-base leading-tight" style={{ color: '#003400' }}>
                                                            {material.name}
                                                          </h4>
                                                          <p className="text-xs sm:text-sm" style={{ color: '#1F1E1D' }}>
                                                            Language: {material.language}
                                                          </p>
                                                        </div>
                                                      </div>
                                                      <a
                                                        href={material.fileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full sm:w-auto px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm text-center transition-all duration-200 hover:transform hover:scale-105 flex-shrink-0"
                                                        style={{ backgroundColor: '#003400', color: '#FFFFFF' }}
                                                      >
                                                        Download PDF
                                                      </a>
                                                    </div>
                                                  ))}
                                                </div>
                                              ) : (
                                                <div className="text-center py-4 sm:py-6">
                                                  <div className="text-xs sm:text-sm" style={{ color: '#1F1E1D' }}>
                                                    No study materials available for {subCarousel.name}
                                                  </div>
                                                </div>
                                              )}
                                            </>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                                  <div className="text-xs sm:text-sm" style={{ color: '#1F1E1D' }}>
                                    No topics available for {carousel.name}
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12 px-4">
                  <div 
                    className="w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
                    style={{ backgroundColor: '#FAEBCE' }}
                  >
                    <svg className="w-8 h-8 sm:w-12 sm:h-12" style={{ color: '#003400' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: '#003400' }}>
                    No Study Materials Available
                  </h3>
                  <p className="text-sm sm:text-base" style={{ color: '#1F1E1D' }}>
                    Study materials for {selectedClass?.name} class will be available soon.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
} 