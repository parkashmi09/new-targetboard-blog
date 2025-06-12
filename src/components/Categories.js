import Link from 'next/link';
import { mockData } from '@/lib/api';
import { FlaskConical, Stethoscope, BookOpen, GraduationCap, Briefcase, Landmark } from 'lucide-react';

const iconMap = {
  FlaskConical,
  Stethoscope,
  BookOpen,
  GraduationCap,
  Briefcase,
  Landmark,
};

export default function Categories() {
  return (
    <section className="py-8 bg-[#FAEBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003400] mb-4 font-jakarta">
            Explore Categories
          </h2>
          <p className="text-xl text-[#000000] font-jakarta">
            Find study materials and resources for your specific exam preparation
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockData.categories.map((category) => {
            const Icon = iconMap[category.icon] || BookOpen;
            return (
              <Link
                key={category.id}
                href={`/category/${category.name.toLowerCase()}`}
                className="group relative rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#FAEBCE] bg-[#FFFFFF]"
              >
                {/* Background Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-80 group-hover:scale-105 transition-transform duration-300 z-0"
                  loading="lazy"
                />
                {/* Overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1E1D]/80 to-transparent z-10" />
                {/* Content */}
                <div className="relative z-20 flex flex-col items-center justify-center h-64 p-8 text-center">
                  <div className="mb-4 bg-[#003400] rounded-full p-4 shadow-lg flex items-center justify-center">
                    <Icon className="h-10 w-10 text-[#FAEBCE]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#003400] mb-2 font-jakarta group-hover:text-[#003400] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-[#000000] mb-4 font-jakarta leading-relaxed group-hover:text-[#000000]">
                    {category.description}
                  </p>
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-[#FAEBCE] text-[#003400] rounded-full group-hover:bg-[#003400] group-hover:text-[#FAEBCE] transition-colors">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-[#FFFFFF] rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <div className="w-16 h-16 bg-[#003400] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-[#FAEBCE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#003400] mb-2 font-jakarta">
              NCERT Books
            </h3>
            <p className="text-[#000000] font-jakarta">
              Complete textbooks for classes 6-12
            </p>
          </div>

          <div className="text-center bg-[#FFFFFF] rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <div className="w-16 h-16 bg-[#003400] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-[#FAEBCE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#003400] mb-2 font-jakarta">
              Previous Papers
            </h3>
            <p className="text-[#000000] font-jakarta">
              Solved question papers with explanations
            </p>
          </div>

          <div className="text-center bg-[#FFFFFF] rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <div className="w-16 h-16 bg-[#003400] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-[#FAEBCE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#003400] mb-2 font-jakarta">
              Quick Access
            </h3>
            <p className="text-[#000000] font-jakarta">
              Instant access to all study materials
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link
            href="/study-materials"
            className="inline-flex items-center px-10 py-5 bg-[#003400] text-[#FFFFFF] rounded-xl font-bold text-xl font-jakarta shadow-xl hover:bg-[#FFCC01] hover:text-[#003400] transition-all duration-200 transform hover:scale-105"
          >
            Browse All Study Materials
            <svg className="ml-3 h-6 w-6 text-[#FFFFFF] group-hover:text-[#003400] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 