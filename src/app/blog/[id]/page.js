'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`https://blog-backend-lv3o.onrender.com/api/v1/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        setBlog(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAEBCE' }}><div className="text-2xl font-bold" style={{ color: '#003400' }}>Loading...</div></div>;
  if (!blog) return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAEBCE' }}><div className="text-2xl font-bold" style={{ color: '#ef4444' }}>Blog not found.</div></div>;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAEBCE' }}>
      <div className="max-w-3xl mx-auto py-12 px-4">
        <Link href="/" className="inline-block mb-8 text-[#003400] font-semibold hover:underline">← Back to Home</Link>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <img src={blog.previewImage} alt={blog.title} className="w-full rounded-xl mb-6 max-h-96 object-cover" style={{ backgroundColor: '#FAEBCE' }} />
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-jakarta" style={{ color: '#003400' }}>{blog.title}</h1>
          <div className="mb-4 flex flex-wrap items-center gap-4 text-gray-500 text-sm">
            <span>By <span className="font-semibold text-[#003400]">{blog.authorName}</span></span>
            <span>•</span>
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            {blog.category?.name && <span className="ml-auto px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#FAEBCE', color: '#003400' }}>{blog.category.name}</span>}
          </div>
          <div className="prose prose-lg max-w-none" style={{ color: '#1F1E1D' }} dangerouslySetInnerHTML={{ __html: blog.content }} />
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {(Array.isArray(blog.tags) ? blog.tags : [blog.tags]).map((tag, idx) => {
                if (typeof tag === 'string') {
                  try { tag = JSON.parse(tag); } catch {}
                }
                if (Array.isArray(tag)) tag = tag[0];
                return (
                  <span key={idx} className="px-3 py-1 text-xs rounded-full" style={{ backgroundColor: '#FAEBCE', color: '#003400' }}>{tag && typeof tag === 'string' ? tag.replace(/[[\]"']+/g, '') : String(tag)}</span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 