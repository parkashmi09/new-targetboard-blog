'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Award } from 'lucide-react';
import Logo from '../assets/Logo.png';
import Image from 'next/image';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="bg-[#FAF5E9] shadow-lg fixed w-full top-0 z-[9997] border-b border-[#FAEBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src={Logo} alt="Logo" width={50} height={50} />
              <span className="text-2xl font-bold text-[#003400] font-jakarta tracking-tight">Blog</span>
            </Link>
          </div>

          {/* Search Bar and Results Button Container */}
          <div className="hidden md:flex flex-1 items-center justify-end max-w-3xl ml-8 gap-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for study materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 text-sm text-[#1F1E1D] bg-white border border-[#FAEBCE] rounded-full focus:outline-none focus:ring-2 focus:ring-[#003400] focus:border-transparent font-jakarta shadow-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#003400]" />
              </div>
            </form>

            {/* Results Button */}
            <Link
              href="/results"
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#003400] text-white rounded-full font-medium transition-all hover:bg-[#004d00] hover:scale-105 shadow-md whitespace-nowrap"
            >
              <Award className="w-5 h-5" />
              Results
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 px-3 py-1.5 pl-8 text-sm text-[#1F1E1D] bg-white border border-[#FAEBCE] rounded-full focus:outline-none focus:ring-2 focus:ring-[#003400] focus:border-transparent font-jakarta"
              />
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[#003400]" />
              </div>
            </form>

            {/* Mobile Results Button */}
            <Link
              href="/results"
              className="inline-flex items-center gap-1 px-4 py-1.5 bg-[#003400] text-white rounded-full text-sm font-medium hover:bg-[#004d00]"
            >
              <Award className="w-4 h-4" />
              Results
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 