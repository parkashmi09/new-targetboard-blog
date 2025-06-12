'use client'
import React, { useState } from 'react';

export default function StayConnected() {
    const [hoveredSocial, setHoveredSocial] = useState(null);

    const socialLinks = [
        { 
            name: 'WhatsApp', 
            color: '#25D366', 
            bgClass: 'bg-green-500',
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.472-.148-.67.15-.197.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.363.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
            )
        },
        { 
            name: 'Telegram', 
            color: '#0088CC', 
            bgClass: 'bg-blue-500',
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
            )
        },
        { 
            name: 'Instagram', 
            color: '#E4405F', 
            bgClass: 'bg-pink-500',
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            )
        },
        { 
            name: 'Facebook', 
            color: '#1877F2', 
            bgClass: 'bg-blue-600',
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
            )
        },
        { 
            name: 'YouTube', 
            color: '#FF0000', 
            bgClass: 'bg-red-500',
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
            )
        },
        { 
            name: 'LinkedIn', 
            color: '#0A66C2', 
            bgClass: 'bg-blue-700',
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            )
        },
        { 
            name: 'Twitter', 
            color: '#1DA1F2', 
            bgClass: 'bg-blue-400',
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
            )
        },
        { 
            name: 'Pinterest', 
            color: '#E60023', 
            bgClass: 'bg-red-600',
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12.013C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
            )
        }
    ];

    return (
        <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#FAF5E9' }}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 animate-pulse" style={{ backgroundColor: '#003400' }}></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-5 animate-pulse delay-1000" style={{ backgroundColor: '#FAEBCE' }}></div>
                <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full opacity-5 animate-bounce delay-500" style={{ backgroundColor: '#003400' }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-6">
                        <div className="relative">
                            <h2 className="text-5xl md:text-6xl font-black font-jakarta mb-4 bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent animate-fade-in">
                                Stay Connected
                            </h2>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full" style={{ backgroundColor: '#003400' }}></div>
                        </div>
                    </div>
                    <p className="text-xl md:text-2xl font-jakarta max-w-2xl mx-auto leading-relaxed" style={{ color: '#1F1E1D' }}>
                        Join our vibrant community across all social platforms for{' '}
                        <span className="font-bold" style={{ color: '#003400' }}>updates</span>,{' '}
                        <span className="font-bold" style={{ color: '#003400' }}>resources</span>, and{' '}
                        <span className="font-bold" style={{ color: '#003400' }}>exclusive content</span>
                    </p>
                </div>

                {/* Main Content Card */}
                <div className="relative max-w-6xl mx-auto">
                    <div 
                        className="relative rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm border border-opacity-20"
                        style={{ 
                            backgroundColor: '#003400',
                            borderColor: '#FAEBCE'
                        }}
                    >
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: '#FAEBCE' }}></div>
                        <div className="absolute top-6 right-6 w-16 h-16 rounded-full opacity-20 animate-spin-slow" style={{ backgroundColor: '#FAEBCE' }}></div>
                        <div className="absolute bottom-6 left-6 w-12 h-12 rounded-full opacity-15 animate-pulse" style={{ backgroundColor: '#FAF5E9' }}></div>

                        <div className="relative p-8 md:p-16">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                {/* Left Side - Icon and Text */}
                                <div className="text-center lg:text-left">
                                    {/* Enhanced Icon */}
                                    <div className="inline-flex items-center justify-center mb-8 relative">
                                        <div className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ backgroundColor: '#FAEBCE' }}></div>
                                        <div className="relative p-6 rounded-full shadow-lg" style={{ backgroundColor: '#FAEBCE' }}>
                                            <svg className="w-16 h-16 md:w-20 md:h-20" style={{ color: '#003400' }} fill="none" stroke="currentColor" viewBox="0 0 64 64">
                                                <rect x="8" y="20" width="48" height="32" rx="6" fill="currentColor" stroke="#003400" strokeWidth="3" />
                                                <path d="M32 12L56 20L32 28L8 20L32 12Z" fill="#003400" />
                                                <rect x="20" y="32" width="24" height="8" rx="2" fill="#003400" />
                                                <circle cx="32" cy="36" r="2" fill="#FAEBCE" />
                                            </svg>
                                        </div>
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-black font-jakarta mb-4" style={{ color: '#FAEBCE' }}>
                                        Connect with{' '}
                                        <span className="relative inline-block">
                                            <span className="text-yellow-400">TargetBoard</span>
                                            <svg className="absolute -bottom-2 left-0 w-full h-2" viewBox="0 0 100 8">
                                                <path d="M0,4 Q50,0 100,4 Q50,8 0,4" fill="#FAEBCE" opacity="0.3" />
                                            </svg>
                                        </span>
                                    </h3>

                                    <p className="text-lg md:text-xl font-jakarta mb-8 opacity-90 leading-relaxed" style={{ color: '#FAEBCE' }}>
                                        Be the first to know about new opportunities, get exclusive study materials, 
                                        and join thousands of successful learners in our community.
                                    </p>

                                    {/* Statistics */}
                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        <div className="text-center p-4 rounded-lg border border-opacity-20" style={{ borderColor: '#FAEBCE' }}>
                                            <div className="text-2xl font-bold text-yellow-400">50K+</div>
                                            <div className="text-sm opacity-75" style={{ color: '#FAEBCE' }}>Followers</div>
                                        </div>
                                        <div className="text-center p-4 rounded-lg border border-opacity-20" style={{ borderColor: '#FAEBCE' }}>
                                            <div className="text-2xl font-bold text-yellow-400">1000+</div>
                                            <div className="text-sm opacity-75" style={{ color: '#FAEBCE' }}>Daily Posts</div>
                                        </div>
                                        <div className="text-center p-4 rounded-lg border border-opacity-20" style={{ borderColor: '#FAEBCE' }}>
                                            <div className="text-2xl font-bold text-yellow-400">24/7</div>
                                            <div className="text-sm opacity-75" style={{ color: '#FAEBCE' }}>Support</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Social Media Grid */}
                                <div className="relative">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {socialLinks.map((social, index) => (
                                            <a
                                                key={social.name}
                                                href="#"
                                                className="group relative flex items-center justify-center p-4 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
                                                style={{
                                                    animationDelay: `${index * 100}ms`,
                                                    boxShadow: hoveredSocial === social.name ? `0 20px 40px ${social.color}20` : undefined
                                                }}
                                                onMouseEnter={() => setHoveredSocial(social.name)}
                                                onMouseLeave={() => setHoveredSocial(null)}
                                            >
                                                {/* Background Gradient */}
                                                <div 
                                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                                    style={{ backgroundColor: social.color }}
                                                ></div>
                                                
                                                {/* Icon Container */}
                                                <div className="relative flex flex-col items-center space-y-2">
                                                    <div 
                                                        className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                                                        style={{ 
                                                            backgroundColor: `${social.color}15`,
                                                            color: social.color
                                                        }}
                                                    >
                                                        {social.icon}
                                                    </div>
                                                    <span 
                                                        className="text-sm font-semibold transition-colors duration-300"
                                                        style={{ 
                                                            color: hoveredSocial === social.name ? social.color : '#003400'
                                                        }}
                                                    >
                                                        {social.name}
                                                    </span>
                                                </div>

                                                {/* Hover Glow Effect */}
                                                <div 
                                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                                                    style={{ backgroundColor: social.color }}
                                                ></div>
                                            </a>
                                        ))}

                                        {/* "See All" Button */}
                                        <a
                                            href="#"
                                            className="group col-span-2 sm:col-span-1 flex items-center justify-center p-4 rounded-2xl border-2 border-dashed transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                                            style={{ 
                                                borderColor: '#FAEBCE',
                                                backgroundColor: 'rgba(250, 235, 206, 0.1)'
                                            }}
                                        >
                                            <div className="flex items-center space-x-2" style={{ color: '#FAEBCE' }}>
                                                <span className="font-semibold">See All</span>
                                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>

                                    {/* Floating Action Button */}
                                    <div className="absolute -bottom-6 -right-6 hidden lg:block">
                                        <button className="w-16 h-16 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 animate-bounce" style={{ backgroundColor: '#FAEBCE' }}>
                                            <svg className="w-8 h-8 mx-auto" style={{ color: '#003400' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

              
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
                .animate-spin-slow {
                    animation: spin-slow 10s linear infinite;
                }
            `}</style>
        </section>
    );
}