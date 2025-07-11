"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Star, User, BookOpen, ArrowLeft, Mail, Phone, MapPin, Calendar, Clock } from 'lucide-react';
import Verified from "../../../assets/verified.png";

export default function TeacherDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://clownfish-app-q4s7f.ondigitalocean.app/api/v1/teacher/${params.id}`);
        if (!response.ok) throw new Error(`Failed to fetch teacher details: ${response.status}`);
        const data = await response.json();
        setTeacher(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load teacher details");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchTeacherDetails();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#1A5C1A]/20 border-t-[#1A5C1A]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex justify-center items-center">
        <div className="text-center">
          <div className="text-[#1A5C1A] text-xl mb-4">{error}</div>
          <button
            onClick={() => router.back()}
            className="bg-[#1A5C1A] text-white px-6 py-2 rounded-lg hover:bg-[#11451d] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex justify-center items-center">
        <div className="text-center">
          <div className="text-[#1A5C1A] text-xl mb-4">Teacher not found</div>
          <button
            onClick={() => router.back()}
            className="bg-[#1A5C1A] text-white px-6 py-2 rounded-lg hover:bg-[#11451d] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#1A5C1A] mb-6 hover:text-[#11451d] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Teachers
        </button>

        {/* Teacher Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Image and Basic Info */}
            <div className="lg:col-span-1 text-center">
              {/* Circular Image with Green Border */}
              <div className="w-40 h-40 mx-auto mb-6 rounded-full border-4 border-[#17612A] overflow-hidden flex items-center justify-center bg-white">
                {teacher.photo ? (
                  <Image
                    src={teacher.photo}
                    alt={`${teacher.name || teacher.subject} profile`}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-24 h-24 text-[#17612A]" />
                )}
              </div>

              {/* Name and Verified Badge */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <h1 className="text-2xl font-extrabold text-[#17612A] tracking-wide uppercase">
                  {(teacher.name ? teacher.name.split(' ')[0] : teacher.subject) + ' SIR'}
                </h1>
                <Image src={Verified} alt="Verified Badge" className="h-8 w-8 object-contain" />
              </div>

              {/* Subject */}
              <div className="text-[#17612A]/80 text-lg mb-4 font-medium">
                {teacher.subject || 'Subject'} Expert
              </div>

              {/* Stars */}
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${i < (teacher.star || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>

              {/* Experience Badge */}
              <div className="bg-[#17612A] text-white rounded-lg py-3 px-6 font-semibold text-lg mb-6">
                {teacher.experience || 10}+ YEARS of Teaching Experience
              </div>

              {/* Category */}
              {teacher.category && (
                <div className="bg-[#17612A]/10 text-[#17612A] rounded-lg py-2 px-4 font-medium">
                  {teacher.category.name}
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-bold text-[#17612A] mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-[#17612A]" />
                      <span className="text-gray-700">teacher@example.com</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-[#17612A]" />
                      <span className="text-gray-700">+91 98765 43210</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-[#17612A]" />
                      <span className="text-gray-700">Mumbai, Maharashtra</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-[#17612A]" />
                      <span className="text-gray-700">Available for Online Classes</span>
                    </div>
                  </div>
                </div>

                {/* Teaching Schedule */}
                <div>
                  <h3 className="text-xl font-bold text-[#17612A] mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Teaching Schedule
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#17612A]/5 rounded-lg">
                      <div className="font-semibold text-[#17612A]">Weekdays</div>
                      <div className="text-gray-600">6:00 PM - 9:00 PM</div>
                    </div>
                    <div className="p-4 bg-[#17612A]/5 rounded-lg">
                      <div className="font-semibold text-[#17612A]">Weekends</div>
                      <div className="text-gray-600">10:00 AM - 6:00 PM</div>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                <div>
                  <h3 className="text-xl font-bold text-[#17612A] mb-4">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#17612A] text-white px-3 py-1 rounded-full text-sm">
                      {teacher.subject || 'Subject'} Fundamentals
                    </span>
                    <span className="bg-[#17612A] text-white px-3 py-1 rounded-full text-sm">
                      Advanced Concepts
                    </span>
                    <span className="bg-[#17612A] text-white px-3 py-1 rounded-full text-sm">
                      Exam Preparation
                    </span>
                    <span className="bg-[#17612A] text-white px-3 py-1 rounded-full text-sm">
                      Problem Solving
                    </span>
                  </div>
                </div>

                {/* Blog Content (if available) */}
                {teacher.blogContent && (
                  <div>
                    <h3 className="text-xl font-bold text-[#17612A] mb-4">Latest Insights</h3>
                    <div className="space-y-4">
                      {/* Blog Title */}
                      {teacher.blogTitle && (
                        <div className="bg-[#17612A]/5 p-4 rounded-lg">
                          <h4 className="text-lg font-semibold text-[#17612A] mb-2">Blog Title</h4>
                          <p className="text-gray-700">{teacher.blogTitle}</p>
                        </div>
                      )}
                      
                      {/* Blog Short Description */}
                      {teacher.blogShortMetaDescription && (
                        <div className="bg-[#17612A]/5 p-4 rounded-lg">
                          <h4 className="text-lg font-semibold text-[#17612A] mb-2">Short Description</h4>
                          <p className="text-gray-700">{teacher.blogShortMetaDescription}</p>
                        </div>
                      )}
                      
                      {/* Blog Content */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold text-[#17612A] mb-3">Full Article</h4>
                        <div 
                          className="prose max-w-none text-gray-700"
                          dangerouslySetInnerHTML={{ __html: teacher.blogContent }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#17612A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#11451d] transition-colors flex items-center justify-center gap-2">
            <Mail className="w-5 h-5" />
            Contact Teacher
          </button>
          <button className="bg-white text-[#17612A] border-2 border-[#17612A] px-8 py-3 rounded-lg font-semibold hover:bg-[#17612A] hover:text-white transition-colors flex items-center justify-center gap-2">
            <BookOpen className="w-5 h-5" />
            View Study Materials
          </button>
        </div>
      </div>
    </div>
  );
} 