'use client'
import React, { useState } from 'react';

export default function StayConnected() {
    const [hoveredSocial, setHoveredSocial] = useState(null);

    const socialLinks = [
        { 
            name: 'WhatsApp', 
            href: 'https://whatsapp.com/channel/0029Va8cGvgD8SE4gSH4pF35',
            color: '#25D366', 
            bgClass: 'bg-green-500',
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.4054 3.4875C18.1607 1.2375 15.1714 0 11.9946 0C5.4375 0 0.101786 5.33571 0.101786 11.8929C0.101786 13.9875 0.648214 16.0339 1.69286 17.8393L0 24L6.30536 22.3393C8.04107 23.2982 9.99643 23.8071 11.9893 23.8071H11.9946C18.5464 23.8071 24 18.4714 24 11.9143C24 8.73214 22.65 5.7375 20.4054 3.4875ZM11.9946 21.8036C10.2161 21.8036 8.47500 21.3161 6.96429 20.3893L6.60357 20.1696L2.86071 21.1607L3.87321 17.5179L3.63214 17.1429C2.61964 15.5732 2.08393 13.7571 2.08393 11.8929C2.08393 6.44464 6.54643 2.00357 12 2.00357C14.6411 2.00357 17.1214 3.02679 19.0071 4.91786C20.8929 6.80893 21.9643 9.28928 21.9589 11.9143C21.9589 17.3679 17.4429 21.8036 11.9946 21.8036ZM17.4161 14.3839C17.1214 14.2339 15.6589 13.5161 15.3857 13.4143C15.1125 13.3179 14.9143 13.2696 14.7161 13.5643C14.5179 13.8589 13.95 14.5286 13.7732 14.7268C13.6018 14.925 13.425 14.9464 13.1304 14.7964C11.3839 13.9232 10.2375 13.2375 9.08571 11.2607C8.78036 10.7357 9.39107 10.7732 9.95357 9.64821C10.0554 9.45 10.0071 9.27857 9.93214 9.12857C9.85714 8.97857 9.26786 7.51607 9.02143 6.92143C8.78036 6.34286 8.53393 6.42321 8.35179 6.41250C8.18036 6.40179 7.98214 6.40179 7.78393 6.40179C7.58571 6.40179 7.26429 6.47679 6.99107 6.76607C6.71786 7.06071 5.94643 7.77857 5.94643 9.24107C5.94643 10.7036 7.0125 12.1179 7.16250 12.3161C7.31786 12.5143 9.25714 15.5196 12.2357 16.8214C14.1214 17.6357 14.8714 17.7214 15.8357 17.5821C16.4036 17.4964 17.5714 16.8589 17.8179 16.1679C18.0643 15.4768 18.0643 14.8821 17.9893 14.7268C17.9196 14.5607 17.7161 14.4643 17.4161 14.3839Z" />
                </svg>
            )
        },
        { 
            name: 'Telegram', 
            href: 'https://t.me/TARGET_BOARD_BSEB',
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
            href: 'https://www.instagram.com/targetboardofficial?igsh=MWdteTRpYmViNTdvZA==',
            color: '#E4405F', 
            bgClass: 'bg-pink-500',
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            )
        },
        { 
            name: 'YouTube', 
            href: 'https://youtube.com/@targetboard?si=WwMvnrP6j7AQIDuG',
            color: '#FF0000', 
            bgClass: 'bg-red-500',
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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
                                    <div className="grid grid-cols-2 gap-4">
                                        {socialLinks.map((social, index) => (
                                            <a
                                                key={social.name}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group relative flex items-center justify-center p-6 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
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
                                                <div className="relative flex flex-col items-center space-y-3">
                                                    <div 
                                                        className="p-4 rounded-xl transition-all duration-300 group-hover:scale-110"
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

                                                {/* Decorative Corner */}
                                                <div 
                                                    className="absolute top-0 right-0 w-8 h-8 transform translate-x-1/2 -translate-y-1/2 rotate-45 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                                    style={{ backgroundColor: social.color }}
                                                ></div>
                                            </a>
                                        ))}
                                    </div>

                                    {/* Enhanced Floating Action Button */}
                                    <div className="absolute -bottom-8 -right-8 hidden lg:block">
                                        <div className="relative">
                                            <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: '#003400' }}></div>
                                            <button 
                                                className="relative w-16 h-16 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300" 
                                                style={{ backgroundColor: '#FAEBCE' }}
                                            >
                                                <svg 
                                                    className="w-8 h-8 mx-auto transform -rotate-45" 
                                                    style={{ color: '#003400' }} 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth={2} 
                                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                                                    />
                                                </svg>
                                            </button>
                                        </div>
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