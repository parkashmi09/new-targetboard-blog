'use client';

import { useEffect } from 'react';
import Categories from "@/components/Categories";

export default function CategoriesPage() {
  useEffect(() => {
    // Smooth scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* <Navigation /> */}
      <main className="pt-8">
        <Categories />
      </main>
    </div>
  );
}