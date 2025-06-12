'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewer({ pdfUrl, title }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoading(false);
  }

  function onDocumentLoadError(error) {
    console.error('Error loading PDF:', error);
    setError('Failed to load PDF. Please try again later.');
    setLoading(false);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg shadow-lg p-8">
        <div className="text-red-500 text-center">
          <svg className="h-16 w-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-lg font-semibold mb-2 font-jakarta">Error Loading PDF</h3>
          <p className="text-gray-600 font-jakarta">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-primary-green text-white px-6 py-4">
        <h2 className="text-xl font-semibold font-jakarta">{title}</h2>
      </div>

      {/* PDF Viewer */}
      <div className="p-6">
        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto mb-4"></div>
              <p className="text-gray-600 font-jakarta">Loading PDF...</p>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto mb-4"></div>
                  <p className="text-gray-600 font-jakarta">Loading PDF...</p>
                </div>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              width={Math.min(window.innerWidth - 100, 800)}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </div>

        {/* Navigation Controls */}
        {numPages && (
          <div className="flex items-center justify-center mt-6 space-x-4">
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className="px-4 py-2 bg-primary-yellow text-text-dark rounded-lg font-medium font-jakarta disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-400 transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center space-x-2 font-jakarta">
              <span className="text-text-dark">Page</span>
              <span className="font-semibold text-primary-green">
                {pageNumber} of {numPages}
              </span>
            </div>

            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
              className="px-4 py-2 bg-primary-yellow text-text-dark rounded-lg font-medium font-jakarta disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-400 transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Download Button */}
        <div className="flex justify-center mt-6">
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center px-6 py-3 bg-primary-green text-white rounded-lg font-medium font-jakarta hover:bg-green-600 transition-colors"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
} 