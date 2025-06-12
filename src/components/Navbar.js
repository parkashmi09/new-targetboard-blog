'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockData } from '@/lib/api';
import { Search } from 'lucide-react';
import Logo from '../assets/Logo.png';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="bg-ivory shadow-md fixed w-full top-0 z-50 border-b border-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src={Logo} alt="Logo" width={50} height={50} />
              <span className="text-2xl font-bold text-mandai-green font-jakarta tracking-tight">Blog</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* Categories Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="text-mandai-green hover:text-mandai-dark px-3 py-2 rounded-md text-sm font-medium font-jakarta transition-colors">
                  Categories
                </button>
                {/* Dropdown Overlay */}
                {dropdownOpen && (
                  <div className="absolute left-0 mt-3 w-[600px] bg-white rounded-xl shadow-xl  z-50 animate-fadeIn">
                    {/* Arrow */}
                    <div className="absolute -top-5 left-8 w-6 h-6 overflow-hidden z-[20] ">
                      <svg width="24" height="24" viewBox="0 0 24 24" className="block ">
                        <polygon points="12,0 24,24 0,24" fill="#fff" stroke="#FAEBCE" strokeWidth="1" />
                      </svg>
                    </div>
                    <div className="py-6 px-8 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2">
                      {mockData.categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/category/${category.name.toLowerCase()}`}
                          className="block text-base text-mandai-green hover:text-mandai-dark font-jakarta py-1 px-2 rounded transition-colors"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/study-materials"
                className="text-mandai-green hover:text-mandai-dark px-3 py-2 rounded-md text-sm font-medium font-jakarta transition-colors"
              >
                Study Materials
              </Link>

              <Link
                href="/updates"
                className="text-mandai-green hover:text-mandai-dark px-3 py-2 rounded-md text-sm font-medium font-jakarta transition-colors"
              >
                Updates
              </Link>

              <Link
                href="/blog"
                className="text-mandai-green hover:text-mandai-dark px-3 py-2 rounded-md text-sm font-medium font-jakarta transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for study materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 text-sm text-mandai-dark bg-beige border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-mandai-green focus:border-transparent font-jakarta"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-mandai-green" />
              </div>
            </form>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-mandai-green hover:text-mandai-dark p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-mandai-green"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-beige border-t border-beige">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="px-3 py-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-sm text-mandai-dark bg-ivory border border-beige rounded-md focus:outline-none focus:ring-2 focus:ring-mandai-green font-jakarta"
              />
            </form>

            {/* Mobile Navigation Links */}
            <Link
              href="/study-materials"
              className="text-mandai-green hover:text-mandai-dark block px-3 py-2 rounded-md text-base font-medium font-jakarta"
              onClick={() => setIsMenuOpen(false)}
            >
              Study Materials
            </Link>

            <Link
              href="/updates"
              className="text-mandai-green hover:text-mandai-dark block px-3 py-2 rounded-md text-base font-medium font-jakarta"
              onClick={() => setIsMenuOpen(false)}
            >
              Updates
            </Link>

            <Link
              href="/blog"
              className="text-mandai-green hover:text-mandai-dark block px-3 py-2 rounded-md text-base font-medium font-jakarta"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>

            {/* Mobile Categories */}
            <div className="px-3 py-2">
              <div className="text-sm font-medium text-mandai-dark mb-2 font-jakarta">Categories</div>
              <div className="space-y-1">
                {mockData.categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.name.toLowerCase()}`}
                    className="block px-3 py-2 text-sm text-mandai-green hover:bg-beige hover:text-mandai-dark rounded-md font-jakarta"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 