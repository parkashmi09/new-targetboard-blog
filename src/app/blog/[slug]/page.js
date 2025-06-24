'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowLeft, Clock } from 'lucide-react';

export default function BlogPostPage() {
  const params = useParams();
  const id = params.slug; // Still using slug param name from route, but treating it as ID
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        
        // Fetch by ID only
        const response = await fetch(`https://blog-backend-lv3o.onrender.com/api/v1/blogs/${id}`);
        
        if (!response.ok) {
          throw new Error('Blog post not found');
        }
        
        const data = await response.json();

        setBlog(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return 'Date not available';
    }
  };

  const getReadingTime = (content) => {
    if (!content || typeof content !== 'string') return 1;
    const wordsPerMinute = 200;
    const textLength = content.replace(/<[^>]*>/g, '').split(' ').length;
    const readingTime = Math.ceil(textLength / wordsPerMinute);
    return readingTime || 1;
  };

  const getBlogImage = (blog) => {
    if (blog?.previewImage) {
      return blog.previewImage;
    }
    const defaultImages = {
      'Technology': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&q=80',
      'Business': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
      'Lifestyle': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
      'Education': 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80'
    };
    const categoryName = blog?.category?.name || 'Education';
    return defaultImages[categoryName] || defaultImages['Education'];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF5E9]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full border-4 border-opacity-20 border-[#003400] animate-spin mx-auto mb-6" style={{ borderTopColor: '#003400' }}></div>
            <h2 className="text-2xl font-bold text-[#003400] mb-4 font-jakarta">Loading Article...</h2>
            <p className="text-gray-600">Please wait while we fetch the content</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#FAF5E9]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl bg-red-500">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#003400] mb-4 font-jakarta">Article Not Found</h2>
            <p className="text-gray-600 mb-8">{error || 'The requested blog post could not be found.'}</p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-[#003400] text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF5E9]">
      {/* Clean Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 text-[#003400] hover:bg-[#003400] hover:text-white rounded-lg transition-colors font-semibold border border-mandai-green"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Category and Reading Time */}
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center px-4 py-2 bg-[#003400] text-white rounded-full text-sm font-semibold">
            {blog.category?.name || 'General'}
          </span>
          <div className="flex items-center text-gray-600 bg-white px-3 py-2 rounded-full shadow-sm border">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">{getReadingTime(blog.content)} min read</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#003400] mb-6 leading-tight font-jakarta">
          {blog.title || 'Untitled Article'}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 mb-8 p-4 bg-white rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#003400] flex items-center justify-center mr-3">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Author</p>
              <p className="font-semibold text-gray-800">{blog.authorName || 'Anonymous'}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Published</p>
              <p className="font-semibold text-gray-800">{formatDate(blog.createdAt)}</p>
            </div>
          </div>
          
          {blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0 && (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                <Tag className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Tags</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg relative">
            <Image
              src={getBlogImage(blog)}
              alt={blog.title || 'Blog image'}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        {/* Meta Description */}
        {blog.metaDescription && (
          <div className="mb-8 p-6 bg-[#FAEBCE] rounded-lg border-l-4 border-[#003400]">
            <p className="text-lg text-gray-700 italic font-jakarta leading-relaxed">
              {blog.metaDescription}
            </p>
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div 
            className="blog-content text-gray-800 leading-relaxed bg-white p-6 rounded-lg shadow-sm"
            dangerouslySetInnerHTML={{ __html: blog.content || '<p>No content available</p>' }}
          />
        </div>

        {/* Clean Article Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Last updated</p>
                <p className="font-semibold text-gray-800">{formatDate(blog.updatedAt)}</p>
              </div>
              
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-[#003400] text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                More Articles
              </Link>
            </div>
          </div>
        </div>
      </article>

      <style jsx global>{`
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1.5rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .blog-content p {
          margin-bottom: 1.25rem;
          line-height: 1.7;
          color: #374151;
        }
        
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          font-weight: 700;
          color: #003400;
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-family: 'Jakarta', sans-serif;
        }
        
        .blog-content h1 { font-size: 2.25rem; }
        .blog-content h2 { font-size: 1.875rem; }
        .blog-content h3 { font-size: 1.5rem; }
        
        .blog-content a {
          color: #003400;
          text-decoration: underline;
          font-weight: 500;
        }
        
        .blog-content a:hover {
          color: #059669;
        }
        
        .blog-content ul,
        .blog-content ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #FAEBCE;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          background-color: #FAF5E9;
          border-radius: 8px;
        }
        
        .blog-content code {
          background-color: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
        }
        
        .blog-content pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        
        .blog-content pre code {
          background: transparent;
          padding: 0;
          color: inherit;
        }
        
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .blog-content th,
        .blog-content td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .blog-content th {
          background-color: #003400;
          color: white;
          font-weight: 600;
        }
        
        .blog-content tr:hover {
          background-color: #f9fafb;
        }
      `}</style>
    </div>
  );
} 