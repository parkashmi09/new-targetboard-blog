'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PDFViewer from '@/components/PDFViewer';

export default function PDFViewerPage() {
  const { id, subCarouselId, materialId } = useParams();
  const [material, setMaterial] = useState(null);
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

        const foundMaterial = materialsArray.find(m => m && m._id === materialId);
        if (foundMaterial) {
          setMaterial(foundMaterial);
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

  const downloadPDF = async () => {
    if (material?.fileUrl) {
      try {
        const response = await fetch(material.fileUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${material.name || 'document'}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading PDF:', error);
      }
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

        <PDFViewer pdfUrl={pdfUrl} title={material.name} />
      </div>
    </div>
  );
} 