"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Trophy, Calendar, Hash, Target, Star, Award, Medal, MapPin, User } from 'lucide-react';

export default function TopperDetailsPage() {
  const { id } = useParams();
  const [topper, setTopper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchTopper = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://clownfish-app-q4s7f.ondigitalocean.app/api/v1/result/${id}`);

    
        if (!response.ok) throw new Error("Failed to fetch topper details");
        const data = await response.json();
        console.log("aghdhdh", data)
        setTopper(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load topper details");
      } finally {
        setLoading(false);
      }
    };
    fetchTopper();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#faf5e9] to-[#f5efe0]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#003400]/20 border-t-[#003400] mx-auto mb-4"></div>
          <p className="text-[#003400] font-semibold">Loading Topper Details...</p>
        </div>
      </div>
    );
  }

  if (error || !topper) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#faf5e9] to-[#f5efe0]">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-[#003400] mb-2">Oops! Something went wrong</h3>
          <p className="text-red-600">{error || "No topper found."}</p>
        </div>
      </div>
    );
  }

  // Helper for stars
  const renderStars = (count = 5) => (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf5e9] to-[#f5efe0] py-10 px-2 md:px-0 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
        {/* Decorative badge */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-[#003400] to-[#004400] text-[#faf5e9] px-6 py-2 rounded-full font-black text-lg shadow-lg flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            {topper.category?.name || "Board Topper"} {topper.year}
          </div>
        </div>

        {/* Topper Image */}
        <div className="flex flex-col items-center mt-8 mb-6">
          <div className="w-36 h-36 rounded-full border-4 border-[#003400] shadow-xl overflow-hidden bg-gradient-to-br from-[#faf5e9] to-white">
            {topper.image ? (
              <img src={topper.image} alt={topper.state + " Topper"} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#003400]">
                <User className="w-16 h-16 text-[#faf5e9]" />
              </div>
            )}
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-[#003400] text-center">{topper.state} Topper</h2>
          <div className="text-[#003400]/80 text-lg font-medium mb-2">Rank #{topper.rank} • {topper.district}</div>
          {renderStars(5)}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-[#faf5e9] to-white p-4 rounded-xl border border-[#003400]/10 flex flex-col items-center">
            <Hash className="w-5 h-5 text-[#003400] mb-1" />
            <div className="text-xs text-[#003400] font-semibold">Roll No</div>
            <div className="font-bold text-[#003400] text-lg">{topper.rollNo}</div>
          </div>
          <div className="bg-gradient-to-br from-[#faf5e9] to-white p-4 rounded-xl border border-[#003400]/10 flex flex-col items-center">
            <Target className="w-5 h-5 text-[#003400] mb-1" />
            <div className="text-xs text-[#003400] font-semibold">Marks</div>
            <div className="font-bold text-[#003400] text-lg">{topper.marks}</div>
          </div>
          <div className="bg-gradient-to-br from-[#faf5e9] to-white p-4 rounded-xl border border-[#003400]/10 flex flex-col items-center">
            <Calendar className="w-5 h-5 text-[#003400] mb-1" />
            <div className="text-xs text-[#003400] font-semibold">Year</div>
            <div className="font-bold text-[#003400] text-lg">{topper.year}</div>
          </div>
          <div className="bg-gradient-to-br from-[#faf5e9] to-white p-4 rounded-xl border border-[#003400]/10 flex flex-col items-center">
            <MapPin className="w-5 h-5 text-[#003400] mb-1" />
            <div className="text-xs text-[#003400] font-semibold">District</div>
            <div className="font-bold text-[#003400] text-lg">{topper.district}</div>
          </div>
        </div>

        {/* Blog Title & Description */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-[#003400] mb-2">{topper.blogTitle}</h3>
          <div className="text-[#003400]/80 mb-2">{topper.blogShortMetaDescription}</div>
        </div>

        {/* Blog Content (HTML) */}
        <div className="prose prose-green max-w-none" dangerouslySetInnerHTML={{ __html: topper.blogContent }} />
      </div>
    </div>
  );
} 