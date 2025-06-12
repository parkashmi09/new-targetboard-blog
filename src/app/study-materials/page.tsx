'use client';

import { useEffect } from 'react';
import StudyMaterials from "@/components/StudyMaterials";

export default function StudyMaterialsPage() {
  useEffect(() => {
    // Smooth scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* <Navigation /> */}
      <main className="pt-8">
        <StudyMaterials />
      </main>
    </div>
  );
}