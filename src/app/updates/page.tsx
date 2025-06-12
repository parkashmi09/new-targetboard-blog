'use client';

import { useEffect } from 'react';
import LatestUpdates from "@/components/LatestUpdates";

export default function UpdatesPage() {
  useEffect(() => {
    // Smooth scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* <Navigation /> */}
      <main className="pt-8">
        <LatestUpdates />
      </main>
    </div>
  );
}