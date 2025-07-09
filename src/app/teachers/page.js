"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Award, User, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

export default function TeachersPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch teacher categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://clownfish-app-q4s7f.ondigitalocean.app/api/v1/teacher-categories');
        if (!response.ok) throw new Error(`Failed to fetch categories: ${response.status}`);
        const data = await response.json();
        setCategories(data);
      } catch {
        setCategories([
          { _id: "all", name: "All Teachers" },
          { _id: "english", name: "English Teacher" },
          { _id: "math", name: "Math Teacher" },
          { _id: "science", name: "Science Teacher" }
        ]);
      }
    };
    fetchCategories();
  }, []);

  // Fetch teachers for selected category
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        setError(null);
        let url = 'https://clownfish-app-q4s7f.ondigitalocean.app/api/v1/get-teachers';
        if (activeCategory !== "all") {
          url += `?category=${activeCategory}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch teachers: ${response.status}`);
        const data = await response.json();
        setTeachers(data);
      } catch {
        setError(err instanceof Error ? err.message : "Failed to load teachers");
      } finally {
        setLoading(false);
      }
    };
    if (categories.length > 0) fetchTeachers();
  }, [activeCategory, categories]);

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Emoji */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-[#1A5C1A] mb-4">
            🌟 Learn from the best educators in India 🌟
          </h2>

          {/* Category Filters */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-[#1A5C1A] text-white"
                  : "bg-white text-[#1A5C1A] border border-[#1A5C1A]/20"
              }`}
              onClick={() => setActiveCategory("all")}
            >
              <User className="w-4 h-4" />
              All Teachers
            </button>

            {categories.map((category) => {
              if (category._id === "all") return null;
              return (
                <button
                  key={category._id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category._id
                      ? "bg-[#1A5C1A] text-white"
                      : "bg-white text-[#1A5C1A] border border-[#1A5C1A]/20"
                  }`}
                  onClick={() => setActiveCategory(category._id)}
                >
                  {category.name === "English Teacher" && <BookOpen className="w-4 h-4" />}
                  {category.name === "Math Teacher" && <Award className="w-4 h-4" />}
                  {category.name === "Science Teacher" && <User className="w-4 h-4" />}
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Teachers Count */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <User className="w-4 h-4 text-[#1A5C1A]" />
              <span className="font-medium text-[#1A5C1A]">{teachers.length} Teachers Found</span>
            </div>
          </div>

          {/* Teachers Grid */}
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1A5C1A]/20 border-t-[#1A5C1A]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-[#1A5C1A]">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teachers.map((teacher) => (
                <div
                  key={teacher._id}
                  className="bg-white rounded-3xl shadow-xl p-8 text-center flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                >
                  {/* Circular Image with Green Border */}
                  <div className="w-28 h-28 mb-4 rounded-full border-4 border-[#17612A] overflow-hidden flex items-center justify-center bg-white">
                    {teacher.photo ? (
                      <Image
                        src={teacher.photo}
                        alt={`${teacher.name || teacher.subject} profile`}
                        width={112}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-[#17612A]" />
                    )}
                  </div>

                  {/* Name and Verified */}
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-xl font-extrabold text-[#17612A] tracking-wide uppercase">
                      {(teacher.name ? teacher.name.split(' ')[0] : teacher.subject) + ' SIR'}
                    </span>
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                  </div>

                  {/* Subject */}
                  <div className="text-[#17612A]/80 text-base mb-2 font-medium">
                    {teacher.subject || 'Subject'} Expert
                  </div>

                  {/* Stars */}
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < (teacher.star || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>

                  {/* Experience */}
                  <div className="w-full bg-[#17612A] text-white rounded-lg py-2 mb-3 font-semibold text-base">
                    10+ YEARS of Teaching Experience
                  </div>

                  {/* View Button */}
                  <button className="w-full bg-[#17612A] text-white rounded-lg py-2 font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#11451d]">
                    View <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Custom Styles for Soft Pulse Animation */}
        <style jsx>{`
          @keyframes pulse-soft {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          .animate-pulse-soft {
            animation: pulse-soft 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
} 