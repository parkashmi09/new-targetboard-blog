'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, BookOpen, Eye } from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (!categoryId) return;
    
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs?category=${categoryId}`);
        const data = await response.json();
        setBlogs(data.blogs || []);
        setCategoryName(data.categoryName || 'Category');
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to load blogs. Please try again later.');
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [categoryId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FAEBCE' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full border-4 border-opacity-20 animate-spin mx-auto mb-8" style={{ borderColor: '#003400', borderTopColor: '#003400' }}></div>
            <h3 className="text-2xl font-bold mb-4 font-jakarta" style={{ color: '#003400' }}>Loading Blogs...</h3>
            <p className="text-gray-600 text-lg">Fetching the latest articles for you</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FAEBCE' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-20">
            <div className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl" style={{ backgroundColor: '#ef4444' }}>
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 font-jakarta" style={{ color: '#003400' }}>Failed to Load Blogs</h3>
            <p className="text-gray-600 mb-8 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
              style={{ backgroundColor: '#003400' }}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAEBCE' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center text-lg font-semibold mb-6 hover:opacity-80 transition-opacity"
            style={{ color: '#003400' }}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-jakarta" style={{ color: '#003400' }}>
              {categoryName || 'Category'} Blogs
            </h1>
            <p className="text-xl text-gray-700 font-jakarta">
              Explore our comprehensive collection of articles and resources
            </p>
          </div>
        </div>

        {/* Blogs Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => {
              // Fix tag parsing for stringified arrays or arrays
              let tags = blog.tags;
              if (typeof tags === 'string') {
                try {
                  tags = JSON.parse(tags);
                } catch {
                  tags = [tags];
                }
              }
              if (!Array.isArray(tags)) tags = [];
              return (
                <article
                  key={blog._id}
                  onClick={() => router.push(`/blog/${blog._id}`)}
                  className="cursor-pointer bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col h-full min-h-[420px] max-h-[420px]"
                  style={{ backgroundColor: '#FFFFFF' }}
                >
                  {/* Blog Image */}
                  <div className="relative h-48 w-full flex-shrink-0">
                    <Image
                      src={blog.previewImage}
                      alt={blog.title}
                      fill
                      className="object-cover object-center rounded-t-2xl"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span 
                        className="px-3 py-1 text-xs font-semibold text-white rounded-full"
                        style={{ backgroundColor: '#003400' }}
                      >
                        {blog.category.name}
                      </span>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-6 flex flex-col flex-1 min-h-0">
                    <h2 className="text-xl font-bold mb-2 font-jakarta line-clamp-2" style={{ color: '#003400' }}>
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mb-4 font-jakarta text-sm line-clamp-3 flex-1 min-h-0">
                      {blog.metaDescription || stripHtml(blog.content).substring(0, 120) + '...'}
                    </p>

                    {/* Blog Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>{blog.authorName}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-full truncate max-w-[120px]"
                            style={{ backgroundColor: '#FAEBCE', color: '#003400' }}
                            title={tag}
                          >
                            {typeof tag === 'string' ? tag.replace(/[[\]"']+/g, '') : String(tag)}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More Button */}
                    <div className="mt-auto">
                      <div className="inline-flex items-center justify-center w-full px-4 py-3 text-white rounded-xl font-semibold transition-opacity hover:opacity-90"
                        style={{ backgroundColor: '#003400' }}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Read Article
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl" style={{ backgroundColor: '#003400' }}>
              <BookOpen className="w-14 h-14 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 font-jakarta" style={{ color: '#003400' }}>No Blogs Available</h3>
            <p className="text-gray-600 text-lg mb-8">
              We&apos;re working on adding more content for this category.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 text-white rounded-xl font-semibold text-lg transition-opacity hover:opacity-90 shadow-lg"
              style={{ backgroundColor: '#003400' }}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        )}

        {/* Load More Section - for future pagination */}
        {blogs.length > 0 && (
          <div className="text-center mt-16">
            <div className="inline-flex items-center px-8 py-4 text-gray-600 rounded-xl font-semibold text-lg border-2 border-gray-200" style={{ backgroundColor: '#FFFFFF' }}>
              <Eye className="h-5 w-5 mr-2" />
              Showing {blogs.length} article{blogs.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 