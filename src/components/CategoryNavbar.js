'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function CategoryNavbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const buttonRefs = useRef({});
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://blog-backend-lv3o.onrender.com/api/v1/categoriesWithSubcategories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.categories.reverse() || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message);
        // Fallback to empty array if API fails
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const calculatePosition = (index) => {
    const button = buttonRefs.current[index];
    if (button) {
      const rect = button.getBoundingClientRect();
      return {
        top: rect.bottom + 2, // Small gap between button and dropdown
        left: rect.left
      };
    }
    return { top: 0, left: 0 };
  };

  const handleButtonHover = (index) => {
    // Only show dropdown if category has subcategories
    if (categories[index]?.subcategories?.length === 0) {
      return;
    }

    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    
    const position = calculatePosition(index);
    setDropdownPosition(position);
    setOpenDropdown(index);
  };

  const handleButtonLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 150); // Short delay to allow moving to dropdown
    setHoverTimeout(timeout);
  };

  const handleDropdownEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  const handleDropdownLeave = () => {
    setOpenDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown !== null) {
        const dropdown = document.getElementById(`dropdown-${openDropdown}`);
        const button = buttonRefs.current[openDropdown];
        if (dropdown && !dropdown.contains(event.target) && button && !button.contains(event.target)) {
          setOpenDropdown(null);
        }
      }
    };

    const handleScroll = () => {
      if (openDropdown !== null) {
        const position = calculatePosition(openDropdown);
        setDropdownPosition(position);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [openDropdown]);

  const DropdownPortal = ({ children, isOpen }) => {
    if (typeof window === 'undefined' || !isOpen) return null;
    return createPortal(children, document.body);
  };

  if (loading) {
    return (
      <div className="bg-[#4A5D3A] shadow-sm border-b border-gray-200 fixed w-full top-16 z-[50]">
        <div className="max-w-full">
          <div className="flex items-center overflow-x-auto scrollbar-hide py-2 px-4 space-x-2">
            {/* Loading skeleton */}
            {[...Array(8)].map((_, index) => (
              <div key={index} className="flex-shrink-0">
                <div className="h-8 bg-[#5A6D4A] rounded-md animate-pulse px-6 py-2">
                  <div className="h-4 bg-[#6A7D5A] rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#4A5D3A] shadow-sm border-b border-gray-200 fixed w-full top-16 z-[50]">
        <div className="max-w-full">
          <div className="flex items-center justify-center py-2 px-4">
            <div className="text-white text-sm">Error loading categories</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#4A5D3A] shadow-sm border-b border-gray-200 fixed w-full top-16 z-[50]">
        <div className="max-w-full">
          <div className="flex items-center overflow-x-auto scrollbar-hide py-2 px-4 space-x-2">
            {categories.map((category, index) => (
              <div key={index} className="relative flex-shrink-0">
                <button
                  ref={(el) => (buttonRefs.current[index] = el)}
                  onMouseEnter={() => handleButtonHover(index)}
                  onMouseLeave={handleButtonLeave}
                  className="flex items-center px-3 py-2 text-white hover:bg-[#5A6D4A] rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-200 focus:outline-none"
                >
                  {category.name}
                  {/* Only show arrow if category has subcategories */}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <svg 
                      className={`ml-2 h-3 w-3 text-white transform transition-transform duration-200 ${openDropdown === index ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>

      {/* Portal Dropdown */}
      <DropdownPortal isOpen={openDropdown !== null && categories[openDropdown]?.subcategories?.length > 0}>
        <div
          id={`dropdown-${openDropdown}`}
          className="fixed w-72 bg-white rounded-lg shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-200"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            zIndex: 999999
          }}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
        >
          {openDropdown !== null && categories[openDropdown] && (
            <div className="py-3">
              <div className="grid grid-cols-1 gap-0.5 px-2 max-h-80 overflow-y-auto">
                {categories[openDropdown]?.subcategories?.map((subcategory, subIndex) => (
                  <Link
                    key={subIndex}
                    href={`/${categories[openDropdown].name.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}/${subcategory.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}`}
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-[#4A5D3A] hover:text-white rounded-md transition-colors duration-150"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {subcategory}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </DropdownPortal>
    </>
  );
} 