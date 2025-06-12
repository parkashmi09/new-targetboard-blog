'use client';

import { useEffect } from 'react';
import Hero from "@/components/Hero";
import LatestUpdates from "@/components/LatestUpdates";
import Categories from "@/components/Categories";
import StudyMaterials from "@/components/StudyMaterials";
import StayConnected from "@/components/StayConnected";

export default function Home() {
  useEffect(() => {
    // Smooth scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* <Navigation /> */}
      <main>
        <Hero />
        <LatestUpdates />
        <Categories />
        <StudyMaterials />
        <StayConnected />
      </main>
    </div>
  );
}
