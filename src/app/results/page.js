"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Trophy, MapPin, Calendar, Hash, Target, Star, Award, Medal } from 'lucide-react'

export default function Component() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [categories, setCategories] = useState([])
  const [toppers, setToppers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://clownfish-app-q4s7f.ondigitalocean.app/api/v1/result-categories')
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.status}`)
        }
        const data = await response.json()
        setCategories(data)
      } catch (err) {
        console.error("Error fetching categories:", err)
        // Fallback to default categories if API fails
        setCategories([
          { _id: "all", name: "All Boards" },
          { _id: "bihar_board", name: "Bihar Board" },
          { _id: "up_board", name: "UP Board" },
          { _id: "mp_board", name: "MP Board" }
        ])
      }
    }

    fetchCategories()
  }, [])

  // Fetch results based on selected category
  useEffect(() => {
    const fetchToppers = async () => {
      try {
        setLoading(true)
        setError(null)

        let url = 'https://clownfish-app-q4s7f.ondigitalocean.app/api/v1/results'
        
        // Add category filter if not "all"
        if (activeCategory !== "all") {
          const selectedCategory = categories.find(cat => cat._id === activeCategory)
          if (selectedCategory) {
            url += `?category=${selectedCategory._id}`
          }
        }

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Request failed – ${response.status} ${response.statusText}`)
        }

        const contentType = response.headers.get("content-type") ?? ""
        if (!contentType.includes("application/json")) {
          const text = await response.text()
          throw new Error("Server returned non-JSON:\n" + text.slice(0, 120) + "…")
        }

        const data = await response.json()
        setToppers(data)
      } catch (err) {
        console.error("Error fetching results:", err)
        setError(err instanceof Error ? err.message : "Failed to load results")
      } finally {
        setLoading(false)
      }
    }

    if (categories.length > 0) {
      fetchToppers()
    }
  }, [activeCategory, categories])

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getBoardName = (topper) => {
    if (topper.category?.name) {
      return topper.category.name
    }
    // Fallback logic based on state
    if (topper.state?.toLowerCase().includes("bihar")) {
      return "Bihar Board"
    }
    if (topper.state?.toLowerCase().includes("up")) {
      return "UP Board"
    }
    if (topper.state?.toLowerCase().includes("mp")) {
      return "MP Board"
    }
    return "Other Board"
  }

  const getRankColor = (rank) => {
    if (rank === 1) return "from-yellow-400 to-yellow-600"
    if (rank === 2) return "from-gray-300 to-gray-500"
    if (rank === 3) return "from-orange-400 to-orange-600"
    return "from-blue-400 to-blue-600"
  }

  const getRankIcon = (rank) => {
    if (rank <= 3) return <Trophy className="w-4 h-4" />
    return <Star className="w-4 h-4" />
  }

  const getCategoryIcon = (categoryName) => {
    if (categoryName.toLowerCase().includes("bihar")) return Trophy
    if (categoryName.toLowerCase().includes("up")) return Medal
    if (categoryName.toLowerCase().includes("mp")) return Award
    return Award
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#faf5e9] to-[#f5efe0]">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#003400]/20 border-t-[#003400] mx-auto"></div>
            <Trophy className="w-8 h-8 text-[#003400] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="mt-4 text-[#003400] font-semibold">Loading Toppers...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#faf5e9] to-[#f5efe0]">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-[#003400] mb-2">Oops! Something went wrong</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf5e9] to-[#f5efe0] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-[#003400] to-[#004400] rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                <Trophy className="w-8 h-8 text-[#faf5e9]" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#faf5e9] rounded-full flex items-center justify-center shadow-md">
                <Star className="w-3 h-3 text-[#003400]" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-[#003400] via-[#004400] to-[#005500] bg-clip-text text-transparent">
                India Toppers 2025
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-[#003400] to-[#004400] rounded-full mx-auto mt-2"></div>
            </div>
          </div>
          <p className="text-[#003400] text-xl font-medium max-w-2xl mx-auto">
            🎉 Celebrating Academic Excellence Across All States 🏆
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {/* All Boards Option */}
          <button
            className={`group flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
              activeCategory === "all"
                ? "bg-gradient-to-r from-[#003400] to-[#004400] text-[#faf5e9] shadow-xl scale-105"
                : "bg-white text-[#003400] shadow-lg hover:shadow-xl border border-[#003400]/10 hover:border-[#003400]"
            }`}
            onClick={() => setActiveCategory("all")}
          >
            <Award
              className={`w-4 h-4 transition-transform group-hover:rotate-12 ${
                activeCategory === "all" ? "text-[#faf5e9]" : "text-[#003400]"
              }`}
            />
            All Boards
            {activeCategory === "all" && (
              <div className="w-2 h-2 bg-[#faf5e9] rounded-full animate-pulse"></div>
            )}
          </button>

          {/* Dynamic Categories from API */}
          {categories.map((category) => {
            const IconComponent = getCategoryIcon(category.name)
            return (
              <button
                key={category._id}
                className={`group flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category._id
                    ? "bg-gradient-to-r from-[#003400] to-[#004400] text-[#faf5e9] shadow-xl scale-105"
                    : "bg-white text-[#003400] shadow-lg hover:shadow-xl border border-[#003400]/10 hover:border-[#003400]"
                }`}
                onClick={() => setActiveCategory(category._id)}
              >
                <IconComponent
                  className={`w-4 h-4 transition-transform group-hover:rotate-12 ${
                    activeCategory === category._id ? "text-[#faf5e9]" : "text-[#003400]"
                  }`}
                />
                {category.name}
                {activeCategory === category._id && (
                  <div className="w-2 h-2 bg-[#faf5e9] rounded-full animate-pulse"></div>
                )}
              </button>
            )
          })}
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
            <Award className="w-4 h-4 text-[#003400]" />
            <span className="font-semibold text-[#003400]">{toppers.length} Toppers Found</span>
          </div>
        </div>

        {/* Toppers Grid */}
        {toppers.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-[#003400]/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-12 h-12 text-[#003400]/40" />
            </div>
            <h3 className="text-xl font-bold text-[#003400] mb-2">No Toppers Found</h3>
            <p className="text-[#003400]/60">Try selecting a different category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {toppers.map((topper, index) => (
              <div
                key={topper._id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Rank Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div
                    className={`bg-gradient-to-r ${getRankColor(topper.rank)} text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg flex items-center gap-1`}
                  >
                    {getRankIcon(topper.rank)}
                    RANK {topper.rank}
                  </div>
                </div>

                {/* Year Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-gradient-to-r from-[#003400] to-[#004400] text-[#faf5e9] px-3 py-1 rounded-full font-bold text-sm shadow-lg flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {topper.year}
                  </div>
                </div>

                {/* Header */}
                <div className="relative bg-gradient-to-r from-[#003400] to-[#004400] p-6 pb-8">
                  <div className="text-center">
                    <h3 className="font-black text-[#faf5e9] text-lg tracking-wide mb-2">
                      {getBoardName(topper).toUpperCase()}
                    </h3>
                    <div className="text-[#faf5e9]/90 text-sm font-medium">{topper.state.toUpperCase()} TOPPER</div>
                  </div>
                </div>

                {/* Avatar */}
                <div className="relative -mt-6 px-6">
                  <div className="w-32 h-32 mx-auto rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-[#faf5e9] to-white">
                    {topper.image ? (
                      <Image
                        src={topper.image}
                        alt={`${topper.state} Topper`}
                        width={116}
                        height={116}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#003400] to-[#004400] flex items-center justify-center">
                        <span className="text-xl font-bold text-[#faf5e9]">{getInitials(topper.state)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-4">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gradient-to-br from-[#faf5e9] to-white p-3 rounded-xl border border-[#003400]/10">
                      <div className="flex items-center gap-2 mb-1">
                        <Hash className="w-3 h-3 text-[#003400]" />
                        <span className="text-[#003400] text-xs font-semibold">Roll No</span>
                      </div>
                      <div className="font-bold text-[#003400] text-sm">{topper.rollNo}</div>
                    </div>

                    <div className="bg-gradient-to-br from-[#faf5e9] to-white p-3 rounded-xl border border-[#003400]/10">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-3 h-3 text-[#003400]" />
                        <span className="text-[#003400] text-xs font-semibold">Marks</span>
                      </div>
                      <div className="font-bold text-[#003400] text-sm">{topper.marks}</div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="bg-gradient-to-br from-[#faf5e9] to-white p-3 rounded-xl border border-[#003400]/10 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#003400]" />
                        <span className="text-[#003400] text-xs font-semibold">District</span>
                      </div>
                      <div className="font-bold text-[#003400] text-sm">{topper.district}</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-[#003400] to-[#004400] hover:from-[#004400] hover:to-[#005500] text-[#faf5e9] font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2 group">
                    <Award className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    VIEW DETAILS
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#003400] to-[#004400] rounded-full opacity-10 transform translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-[#003400] to-[#004400] rounded-full opacity-10 transform -translate-x-8 translate-y-8"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fade-in {
        animation: fade-in 0.6s ease-out forwards;
        opacity: 0;
      }
    `}</style>
    </div>
  )
}
