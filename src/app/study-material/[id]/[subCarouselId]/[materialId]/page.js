'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PDFViewerPage() {
  const { id, subCarouselId, materialId } = useParams();
  const router = useRouter();
  const [material, setMaterial] = useState(null);
  const [allMaterials, setAllMaterials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Validate required parameters
        if (!subCarouselId || !materialId) {
          setError('Invalid material parameters');
          return;
        }
        
        // Fetch all materials for navigation
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-study-material?subCarouselId=${subCarouselId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const materials = await response.json();
        const materialsArray = Array.isArray(materials) ? materials : [];
        
        setAllMaterials(materialsArray);
        
        const foundMaterial = materialsArray.find(m => m && m._id === materialId);
        if (foundMaterial) {
          setMaterial(foundMaterial);
          // Find current material index for navigation
          const index = materialsArray.findIndex(m => m && m._id === materialId);
          setCurrentIndex(index >= 0 ? index : 0);
          // Reset to first page when material changes
          setCurrentPage(1);
        } else {
          setError('Study material not found');
        }
      } catch (error) {
        console.error('Error fetching material:', error);
        setError('Failed to load study material');
      } finally {
        setLoading(false);
      }
    };

    if (materialId && subCarouselId) {
      fetchMaterial();
    }
  }, [materialId, subCarouselId]);

  const navigateToMaterial = (direction) => {
    if (!allMaterials || allMaterials.length <= 1) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : allMaterials.length - 1;
    } else {
      newIndex = currentIndex < allMaterials.length - 1 ? currentIndex + 1 : 0;
    }
    
    const newMaterial = allMaterials[newIndex];
    if (newMaterial && newMaterial._id) {
      router.push(`/study-material/${id}/${subCarouselId}/${newMaterial._id}`);
    }
  };

  const navigatePage = (direction) => {
    if (!material?.fileUrl) return;
    
    let newPage;
    if (direction === 'prev') {
      newPage = currentPage > 1 ? currentPage - 1 : currentPage;
    } else {
      newPage = currentPage + 1;
    }
    
    if (newPage !== currentPage && newPage >= 1) {
      setCurrentPage(newPage);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && material?.fileUrl) {
      setCurrentPage(pageNumber);
    }
  };

  const downloadPDF = () => {
    if (material?.fileUrl) {
      const link = document.createElement('a');
      link.href = material.fileUrl;
      link.download = `${material.name || 'document'}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#9CA3AF' }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-opacity-20 border-white animate-spin mx-auto mb-4" style={{ borderTopColor: 'white' }}></div>
          <div className="text-2xl font-bold text-white">Loading PDF...</div>
        </div>
      </div>
    );
  }

  if (error || !material) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#9CA3AF' }}>
        <div className="text-center">
          <div className="text-2xl font-bold mb-4 text-white">{error || 'Material not found'}</div>
          <Link href={`/study-material/${id}/${subCarouselId}`} className="text-white hover:underline">
            ← Back to Study Materials
          </Link>
        </div>
      </div>
    );
  }

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = true; // Always allow next since we don't know total pages
  
  // Construct PDF URL with page parameter
  const pdfUrl = material.fileUrl + (currentPage > 1 ? `#page=${currentPage}` : '');

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#9CA3AF' }}>
      {/* Top Header Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Back button and title */}
            <div className="flex items-center space-x-4">
              <Link
                href={`/study-material/${id}/${subCarouselId}`}
                className="flex items-center px-3 py-1 rounded-lg font-medium text-sm transition-colors duration-200 hover:bg-gray-100"
                style={{ color: '#003400' }}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="font-semibold text-lg truncate max-w-md" style={{ color: '#003400' }}>
                {material.name}
              </h1>
              <span className="text-sm text-gray-500">
                (Page {currentPage})
              </span>
            </div>

            {/* Right side - Download button */}
            <button
              onClick={downloadPDF}
              className="flex items-center px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 hover:opacity-90"
              style={{ backgroundColor: '#003400', color: '#FFFFFF' }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Main PDF Viewer Area */}
      <div className="relative flex-1" style={{ height: 'calc(100vh - 80px)' }}>
        {/* Left Navigation Arrow - Previous Page */}
        {hasPreviousPage && (
          <button 
            onClick={() => navigatePage('prev')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all duration-200 flex items-center justify-center"
            title="Previous Page"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right Navigation Arrow - Next Page */}
        {hasNextPage && (
          <button 
            onClick={() => navigatePage('next')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all duration-200 flex items-center justify-center"
            title="Next Page"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* PDF Container */}
        <div className="flex items-center justify-center h-full px-20 py-8">
          <div className="relative max-w-6xl w-full h-full bg-white shadow-2xl rounded-lg overflow-hidden">
            <iframe
              src={pdfUrl}
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              title={`PDF: ${material.name} - Page ${currentPage}`}
              className="w-full h-full"
              key={`${material._id}-${currentPage}`} // Force re-render when page changes
            />
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-black bg-opacity-80 rounded-full px-6 py-3 flex items-center space-x-6">
            {/* Grid View Button */}
            <Link
              href={`/study-material/${id}/${subCarouselId}`}
              className="text-white hover:text-gray-300 transition-colors duration-200"
              title="View all materials"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </Link>

            {/* Previous Page */}
            {hasPreviousPage && (
              <button 
                onClick={() => navigatePage('prev')}
                className="text-white hover:text-gray-300 transition-colors duration-200"
                title="Previous page"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Page Input */}
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                value={currentPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value);
                  if (page >= 1) {
                    setCurrentPage(page);
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const page = parseInt(e.target.value);
                    goToPage(page);
                  }
                }}
                className="w-16 px-2 py-1 text-center text-black rounded border-none focus:outline-none focus:ring-2 focus:ring-white"
                style={{ backgroundColor: 'white' }}
              />
              <span className="text-white text-sm">/ Page</span>
            </div>

            {/* Next Page */}
            {hasNextPage && (
              <button 
                onClick={() => navigatePage('next')}
                className="text-white hover:text-gray-300 transition-colors duration-200"
                title="Next page"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Zoom Out */}
            <button className="text-white hover:text-gray-300 transition-colors duration-200" title="Zoom out">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            </button>

            {/* Zoom In */}
            <button className="text-white hover:text-gray-300 transition-colors duration-200" title="Zoom in">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </button>

            {/* Fullscreen */}
            <button 
              onClick={() => window.open(pdfUrl, '_blank')}
              className="text-white hover:text-gray-300 transition-colors duration-200"
              title="Open in new tab"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>

            {/* Material Navigation */}
            {allMaterials && allMaterials.length > 1 && (
              <>
                <div className="h-6 w-px bg-gray-400"></div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => navigateToMaterial('prev')}
                    className="text-white hover:text-gray-300 transition-colors duration-200"
                    title="Previous material"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-white text-sm">
                    {currentIndex + 1}/{allMaterials.length}
                  </span>
                  <button 
                    onClick={() => navigateToMaterial('next')}
                    className="text-white hover:text-gray-300 transition-colors duration-200"
                    title="Next material"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 