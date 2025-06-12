import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const endpoints = {
  posts: '/posts',
  updates: '/updates',
  studyMaterials: '/study-materials',
  categories: '/categories',
  search: '/search',
};

// Fetch blog posts
export const fetchPosts = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`${endpoints.posts}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Fetch exam updates
export const fetchUpdates = async () => {
  try {
    const response = await api.get(endpoints.updates);
    return response.data;
  } catch (error) {
    console.error('Error fetching updates:', error);
    throw error;
  }
};

// Fetch study materials
export const fetchStudyMaterials = async (category = 'all') => {
  try {
    const response = await api.get(`${endpoints.studyMaterials}?category=${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching study materials:', error);
    throw error;
  }
};

// Fetch categories
export const fetchCategories = async () => {
  try {
    const response = await api.get(endpoints.categories);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Search functionality
export const searchContent = async (query) => {
  try {
    const response = await api.get(`${endpoints.search}?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching content:', error);
    throw error;
  }
};

// Mock data for development (remove when backend is ready)
export const mockData = {
  heroImages: [
    'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1510936111840-6cef99faf2a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1200&q=80',
  ],
  heroImage: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80',
  updates: [
    {
      id: 1,
      title: 'CUET UG 2025 Updates',
      description: 'Latest updates on CUET UG 2025 examination schedule and important dates',
      date: '2025-01-15',
      category: 'CUET',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'JEE Main 2025 Registration',
      description: 'JEE Main 2025 registration process and important guidelines',
      date: '2025-01-10',
      category: 'JEE',
      image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'NEET 2025 Exam Pattern',
      description: 'Updated exam pattern and syllabus for NEET 2025',
      date: '2025-01-08',
      category: 'NEET',
      image: 'https://images.unsplash.com/photo-1510936111840-6cef99faf2a9?auto=format&fit=crop&w=800&q=80',
    },
  ],
  categories: [
    { id: 1, name: 'JEE', description: 'Joint Entrance Examination', icon: 'FlaskConical', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'NEET', description: 'National Eligibility cum Entrance Test', icon: 'Stethoscope', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'CBSE', description: 'Central Board of Secondary Education', icon: 'BookOpen', image: 'https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?auto=format&fit=crop&w=600&q=80' },
    { id: 4, name: 'CUET', description: 'Common University Entrance Test', icon: 'GraduationCap', image: 'https://images.unsplash.com/photo-1462536943532-57a629f6cc60?auto=format&fit=crop&w=600&q=80' },
    { id: 5, name: 'CAT', description: 'Common Admission Test', icon: 'Briefcase', image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80' },
    { id: 6, name: 'State Boards', description: 'State Board Examinations', icon: 'Landmark', image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80' },
  ],
  studyMaterials: [
    {
      id: 1,
      title: 'NCERT Books 2022-23',
      category: 'CBSE',
      description: 'Complete NCERT textbooks for classes 6-12',
      pdfUrl: '/pdfs/ncert-books-2022-23.pdf',
      thumbnail: 'https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      title: 'JEE Main Previous Papers',
      category: 'JEE',
      description: 'Previous year question papers with solutions',
      pdfUrl: '/pdfs/jee-main-previous-papers.pdf',
      thumbnail: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 3,
      title: 'NEET Study Material',
      category: 'NEET',
      description: 'Comprehensive study material for NEET preparation',
      pdfUrl: '/pdfs/neet-study-material.pdf',
      thumbnail: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    },
  ],
};

export default api; 