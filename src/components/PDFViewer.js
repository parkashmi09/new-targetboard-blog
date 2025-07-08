'use client';

import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

export default function PDFViewer({ pdfUrl, title }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  const handleDownload = async () => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title || 'document'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  if (!isClient) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-green mx-auto mb-6"></div>
          <h3 className="text-lg font-semibold text-gray-700 font-jakarta mb-2">Initializing PDF Viewer...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      {/* Download button - visible on both mobile and desktop */}
      <div className="sticky top-[4.5rem] z-10 w-full bg-gray-100 py-2 flex justify-center lg:hidden">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#003400] text-white rounded-full font-medium transition-all hover:bg-[#004d00] hover:scale-105 shadow-md"
        >
          <Download className="w-5 h-5" />
          <span className="font-jakarta">Download PDF</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
        <iframe
          src={pdfUrl}
          title={title}
          width="100%"
          height="700px"
          style={{ border: 'none', background: '#f5f5f5', maxWidth: 900 }}
        />
      </div>
    </div>
  );
}