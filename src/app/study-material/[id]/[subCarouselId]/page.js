'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function StudyMaterialsPage() {
  const { id, subCarouselId } = useParams();
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [subCarouselName, setSubCarouselName] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!subCarouselId) return;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch study materials
        const materialsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-study-material?subCarouselId=${subCarouselId}`);
        const materialsData = await materialsResponse.json();
        setStudyMaterials(materialsData || []);
        
        // Try to get subcategory name for breadcrumb
        const categoriesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categoriesWithSubcategories`);
        const categoriesData = await categoriesResponse.json();
        
        // Find the subcategory name
        for (const category of categoriesData.categories) {
          const foundSubcategory = category.subcategories?.find(sub => sub._id === id);
          if (foundSubcategory) {
            setSubcategoryName(foundSubcategory.name);
            break;
          }
        }
        
        // Set a generic name for sub-carousel (we could fetch this from carousel API if needed)
        setSubCarouselName('Study Materials');
        
      } catch (error) {
        console.error('Error fetching study materials:', error);
        setError('Failed to load study materials');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, subCarouselId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF5E9' }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-opacity-20 border-[#003400] animate-spin mx-auto mb-4" style={{ borderTopColor: '#003400' }}></div>
          <div className="text-2xl font-bold" style={{ color: '#003400' }}>Loading Study Materials...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF5E9' }}>
        <div className="text-center">
          <div className="text-2xl font-bold mb-4" style={{ color: '#ef4444' }}>{error}</div>
          <Link href={`/study-material/${id}`} className="text-[#003400] hover:underline">
            ← Back to Study Materials
          </Link>
        </div>
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
            <Link href={`/study-material/${id}`} className="hover:underline whitespace-nowrap">
              {subcategoryName || 'Study Material'}
            </Link>
            <span>/</span>
            <span className="font-semibold whitespace-nowrap">{subCarouselName}</span>
          </nav>

          {/* Main heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight" style={{ color: '#003400' }}>
            {subCarouselName}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-4xl leading-relaxed" style={{ color: '#1F1E1D' }}>
            Download comprehensive study materials including textbooks, solutions, and additional resources 
            to enhance your learning experience.
          </p>
        </div>
      </div>

      {/* Study Materials Grid */}
      <div className="py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {studyMaterials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {studyMaterials.map((material) => (
                <Link 
                  key={material._id} 
                  href={`/study-material/${id}/${subCarouselId}/${material._id}`}
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border cursor-pointer transform hover:scale-105 h-full flex flex-col" style={{ borderColor: '#FAEBCE', minHeight: '280px' }}>
                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      {/* Material Icon */}
                      <div className="flex items-start mb-4">
                        <div 
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                          style={{ backgroundColor: '#003400' }}
                        >
                          <svg className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: '#FFFFFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base sm:text-lg leading-tight mb-1 line-clamp-2" style={{ color: '#003400', height: '2.5rem', overflow: 'hidden' }}>
                            {material.name}
                          </h3>
                          <p className="text-xs sm:text-sm truncate" style={{ color: '#1F1E1D' }}>
                            Language: {material.language || 'Not specified'}
                          </p>
                        </div>
                      </div>

                      {/* Material Details */}
                      <div className="mb-4 p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: '#FAF5E9' }}>
                        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                          <div>
                            <span className="font-medium" style={{ color: '#003400' }}>Type:</span>
                            <span className="ml-1" style={{ color: '#1F1E1D' }}>PDF Document</span>
                          </div>
                          <div>
                            <span className="font-medium" style={{ color: '#003400' }}>Format:</span>
                            <span className="ml-1" style={{ color: '#1F1E1D' }}>Downloadable</span>
                          </div>
                        </div>
                      </div>

                      {/* View PDF Button - Always at bottom */}
                      <div className="mt-auto">
                        <div className="w-full flex items-center justify-center px-4 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200"
                          style={{ backgroundColor: '#003400', color: '#FFFFFF' }}
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View PDF
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12 sm:py-20">
              <div 
                className="w-20 h-20 sm:w-32 sm:h-32 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8"
                style={{ backgroundColor: '#FAEBCE' }}
              >
                <svg className="w-10 h-10 sm:w-16 sm:h-16" style={{ color: '#003400' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: '#003400' }}>
                No Study Materials Available
              </h3>
              <p className="text-sm sm:text-base mb-6 sm:mb-8" style={{ color: '#1F1E1D' }}>
                Study materials for this topic will be available soon. Please check back later.
              </p>
              <Link
                href={`/study-material/${id}`}
                className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-200 hover:opacity-90"
                style={{ backgroundColor: '#003400', color: '#FFFFFF' }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Study Materials
              </Link>
            </div>
          )}

          {/* Back Button */}
          {studyMaterials.length > 0 && (
            <div className="text-center mt-8 sm:mt-12">
              <Link
                href={`/study-material/${id}`}
                className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-200 hover:opacity-90 border"
                style={{ backgroundColor: '#FFFFFF', color: '#003400', borderColor: '#003400' }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Study Materials
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 