'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ResultsPage() {
  const [selectedCategory, setSelectedCategory] = useState('CBSE 12th');

  const categories = [
    'CBSE 10th',
    'ICSE 10th',
    'CBSE 12th',
    'CA',
    'MBA',
    'SSC'
  ];

  const toppers = [
    {
      id: 1,
      rank: 'RANK-1',
      year: '2025',
      type: 'BIHAR TOPPER',
      rollNo: '12345',
      marks: '98.8%',
      district: 'Patna',
      image: '/student-placeholder.jpg'
    },
    {
      id: 2,
      rank: 'RANK-1',
      year: '2025',
      type: 'BIHAR TOPPER',
      rollNo: '12346',
      marks: '98.6%',
      district: 'Gaya',
      image: '/student-placeholder.jpg'
    },
    {
      id: 3,
      rank: 'RANK-1',
      year: '2025',
      type: 'BIHAR TOPPER',
      rollNo: '12347',
      marks: '98.4%',
      district: 'Muzaffarpur',
      image: '/student-placeholder.jpg'
    },
    {
      id: 4,
      rank: 'RANK-1',
      year: '2025',
      type: 'BIHAR TOPPER',
      rollNo: '12348',
      marks: '98.2%',
      district: 'Bhagalpur',
      image: '/student-placeholder.jpg'
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FAF5E9' }}>
      {/* Category Tags */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-[#003400] text-white'
                  : 'bg-white text-[#003400] border border-[#003400]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {toppers.map((topper) => (
            <div
              key={topper.id}
              className="bg-white rounded-lg overflow-hidden shadow-md relative transform hover:scale-[1.02] transition-all duration-300"
              style={{ 
                border: '1px solid #FAEBCE'
              }}
            >
              {/* Year Tag */}
              <div 
                className="absolute top-[-10px] left-[-20px] z-10 bg-[#FF0000] text-white"
                style={{
                  transform: 'rotate(-55deg) translateX(-27%) translateY(-10%)',
                  padding: '10px 50px 8px',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}
              >
                {topper.year}
              </div>

              {/* Topper Type */}
              <div 
                className="bg-[#003400] text-white text-center py-2 text-sm font-bold"
              >
                {topper.type}
              </div>

              {/* Student Image */}
              <div className="w-28 h-28 mx-auto mt-4 mb-2 rounded-full overflow-hidden border-2 border-[#003400]">
                <div className="w-full h-full bg-[#003400] rounded-full flex items-center justify-center">
                  <Image
                    src={topper.image}
                    alt="Student"
                    width={112}
                    height={112}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Rank */}
              <div className="text-center text-2xl font-bold mb-4 text-[#003400]">
                {topper.rank}
              </div>

              {/* Details */}
              <div className="px-4 py-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#666666]">Roll No-</span>
                  <span className="text-sm font-medium text-[#003400]">{topper.rollNo}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#666666]">Marks-</span>
                  <span className="text-sm font-medium text-[#003400]">{topper.marks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#666666]">District-</span>
                  <span className="text-sm font-medium text-[#003400]">{topper.district}</span>
                </div>
              </div>

              {/* More Details Button */}
              <div className="p-3">
                <button
                  className="w-full bg-[#003400] text-white py-2 rounded-md hover:bg-[#004d00] transition-colors flex items-center justify-center gap-2"
                >
                  MORE DETAILS
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 