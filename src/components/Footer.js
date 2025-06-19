'use client'
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: 'black' }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Enhanced Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <div className="relative inline-block">
                <span className="text-4xl font-black font-jakarta relative z-10" style={{ color: '#FFD600', letterSpacing: '-0.02em' }}>
                  Target Board
                </span>
                {/* <div className="absolute -bottom-1 left-0 w-full h-2 opacity-30 rounded-full" style={{ backgroundColor: '#FAEBCE' }}></div> */}
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#FFD600' }}></div>
                <span className="text-sm font-semibold" style={{ color: '#FAEBCE' }}>India&apos;s #1 Free Education Platform</span>
              </div>
            </div>
            
            <p className="text-lg mb-6 leading-relaxed font-jakarta" style={{ color: '#FAF5E9' }}>
              Empowering millions of students with 
              <span className="font-bold text-yellow-400"> free NCERT books</span>, 
              <span className="font-bold text-yellow-400"> expert solutions</span>, and 
              <span className="font-bold text-yellow-400"> real-time exam updates</span> for board and competitive exams.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-3 rounded-xl border border-opacity-20 hover:border-opacity-40 transition-all duration-300" style={{ borderColor: '#FAEBCE' }}>
                <div className="text-xl font-bold text-yellow-400">1M+</div>
                <div className="text-xs opacity-75" style={{ color: '#FAEBCE' }}>Students</div>
              </div>
              <div className="text-center p-3 rounded-xl border border-opacity-20 hover:border-opacity-40 transition-all duration-300" style={{ borderColor: '#FAEBCE' }}>
                <div className="text-xl font-bold text-yellow-400">500+</div>
                <div className="text-xs opacity-75" style={{ color: '#FAEBCE' }}>Resources</div>
              </div>
              <div className="text-center p-3 rounded-xl border border-opacity-20 hover:border-opacity-40 transition-all duration-300" style={{ borderColor: '#FAEBCE' }}>
                <div className="text-xl font-bold text-yellow-400">100%</div>
                <div className="text-xs opacity-75" style={{ color: '#FAEBCE' }}>Free</div>
              </div>
            </div>

            {/* Enhanced Social Media */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold" style={{ color: '#FAEBCE' }}>Connect With Us</h4>
              <div className="flex flex-wrap gap-3">
                {[
                  { href: "https://wa.me/your-number", label: "WhatsApp", color: "#25D366", path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" },
                  { href: "https://t.me/your-channel", label: "Telegram", color: "#0088CC", path: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" },
                  { href: "https://facebook.com/your-page", label: "Facebook", color: "#1877F2", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                  { href: "https://instagram.com/your-handle", label: "Instagram", color: "#E4405F", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                  { href: "https://youtube.com/your-channel", label: "YouTube", color: "#FF0000", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                    style={{ 
                      backgroundColor: `${social.color}15`,
                      border: `2px solid ${social.color}30`
                    }}
                    aria-label={social.label}
                  >
                    {/* Glow Effect */}
                    <div 
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300"
                      style={{ backgroundColor: social.color }}
                    ></div>
                    
                    <svg 
                      className="relative w-6 h-6 transition-colors duration-300" 
                      style={{ color: social.color }}
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div className="group">
            <div className="relative mb-6">
              <h3 className="text-xl font-bold font-jakarta" style={{ color: '#FAEBCE' }}>Quick Links</h3>
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 rounded-full transition-all duration-300 group-hover:w-16" style={{ backgroundColor: '#FFD600' }}></div>
            </div>
            <ul className="space-y-3 font-jakarta">
              {[
                { href: "/about", text: "About Us", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                { href: "/privacy-policy", text: "Privacy Policy", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                { href: "/terms", text: "Terms of Service", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                { href: "/contact", text: "Contact Us", icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center space-x-3 py-2 px-3 rounded-lg transition-all duration-300 hover:transform hover:translate-x-2"
                    style={{ 
                      color: '#FAF5E9',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <svg className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                    </svg>
                    <span className="group-hover:text-yellow-400 transition-colors duration-300">{link.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Contact Info */}
          <div className="group">
            <div className="relative mb-6">
              <h3 className="text-xl font-bold font-jakarta" style={{ color: '#FAEBCE' }}>Get In Touch</h3>
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 rounded-full transition-all duration-300 group-hover:w-16" style={{ backgroundColor: '#FFD600' }}></div>
            </div>
            <div className="space-y-4 font-jakarta">
              <div className="group flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 hover:transform hover:scale-105" style={{ backgroundColor: 'rgba(250, 235, 206, 0.05)' }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 214, 0, 0.2)' }}>
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm opacity-75" style={{ color: '#FAEBCE' }}>Email us</p>
                  <a href="mailto:hello@targetboard.com" className="font-semibold hover:text-yellow-400 transition-colors duration-300" style={{ color: '#FAF5E9' }}>
                    hello@targetboard.com
                  </a>
                </div>
              </div>
              
              <div className="group flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 hover:transform hover:scale-105" style={{ backgroundColor: 'rgba(250, 235, 206, 0.05)' }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 214, 0, 0.2)' }}>
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm opacity-75" style={{ color: '#FAEBCE' }}>Our Location</p>
                  <span className="font-semibold" style={{ color: '#FAF5E9' }}>New Delhi, India</span>
                </div>
              </div>
              
              <div className="group flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 hover:transform hover:scale-105" style={{ backgroundColor: 'rgba(250, 235, 206, 0.05)' }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 214, 0, 0.2)' }}>
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm opacity-75" style={{ color: '#FAEBCE' }}>Support Hours</p>
                  <span className="font-semibold" style={{ color: '#FAF5E9' }}>24/7 Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="relative mt-16">
          {/* Decorative Line */}
          <div className="flex items-center mb-8">
            <div className="flex-1 h-px opacity-20" style={{ backgroundColor: '#FAEBCE' }}></div>
            <div className="px-4">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#FFD600' }}></div>
            </div>
            <div className="flex-1 h-px opacity-20" style={{ backgroundColor: '#FAEBCE' }}></div>
          </div>
          
          <div className="text-center font-jakarta">
            <p className="text-lg font-semibold mb-2" style={{ color: '#FAF5E9' }}>
              © {currentYear} Target Board. All Rights Reserved.
            </p>
            <p className="text-sm opacity-75 mb-4" style={{ color: '#FAEBCE' }}>
              Empowering students with free education resources across India
            </p>
            
            {/* Bottom Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {['Sitemap', 'Accessibility', 'Careers', 'Press Kit'].map((link) => (
                <Link 
                  key={link} 
                  href={`/${link.toLowerCase().replace(' ', '-')}`}
                  className="hover:text-yellow-400 transition-colors duration-300"
                  style={{ color: '#FAEBCE' }}
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}