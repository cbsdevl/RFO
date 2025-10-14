import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Organization Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="RFO Logo"
                className="w-16 h-16 rounded-full border-2 border-yellow-400 shadow-lg"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/64x64?text=RFO'; }}
              />
              <div>
                <h3 className="text-xl font-bold text-yellow-400">Rise Family Organization</h3>
                <p className="text-sm text-blue-200">Empowering Futures</p>
              </div>
            </div>
            <p className="text-blue-100 leading-relaxed">
              Dedicated to transforming lives through education, healthcare, and community development in Rwanda.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaFacebook className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaTwitter className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaInstagram className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaYoutube className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaLinkedin className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-yellow-400 border-b border-yellow-400 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-blue-100 hover:text-yellow-400 transition-colors duration-300 flex items-center space-x-2"><span>•</span><span>Home</span></Link></li>
              <li><Link to="/about" className="text-blue-100 hover:text-yellow-400 transition-colors duration-300 flex items-center space-x-2"><span>•</span><span>About Us</span></Link></li>
              <li><Link to="/contact" className="text-blue-100 hover:text-yellow-400 transition-colors duration-300 flex items-center space-x-2"><span>•</span><span>Contact</span></Link></li>
              <li><Link to="/news" className="text-blue-100 hover:text-yellow-400 transition-colors duration-300 flex items-center space-x-2"><span>•</span><span>News</span></Link></li>
              <li><Link to="/gifts" className="text-blue-100 hover:text-yellow-400 transition-colors duration-300 flex items-center space-x-2"><span>•</span><span>Gift Catalog</span></Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-yellow-400 border-b border-yellow-400 pb-2">Our Programs</h4>
            <ul className="space-y-3">
              <li><Link to="/program-education" className="text-blue-100 hover:text-yellow-400 transition-colors duration-300 flex items-center space-x-2"><span>•</span><span>Education</span></Link></li>
              <li><Link to="/program-health" className="text-blue-100 hover:text-yellow-400 transition-colors duration-300 flex items-center space-x-2"><span>•</span><span>Healthcare</span></Link></li>
              <li><Link to="/program-employment" className="text-blue-100 hover:text-yellow-400 transition-colors duration-300 flex items-center space-x-2"><span>•</span><span>Employment</span></Link></li>
              <li><Link to="/program-talent" className="text-blue-100 hover:text-yellow-400 transition-colors duration-300 flex items-center space-x-2"><span>•</span><span>Talent Development</span></Link></li>
              <li><Link to="/volunteer" className="text-blue-100 hover:text-yellow-400 transition-colors duration-300 flex items-center space-x-2"><span>•</span><span>Volunteer</span></Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-yellow-400 border-b border-yellow-400 pb-2">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-yellow-400 mt-1 flex-shrink-0" />
                <p className="text-blue-100 text-sm leading-relaxed">
                  Eastern Province, Bugesera District,<br />Rilima Sector, Rwanda
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-yellow-400 flex-shrink-0" />
                <p className="text-blue-100">+250 788 854 883</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-yellow-400 flex-shrink-0" />
                <p className="text-blue-100">risefamilyorganization@gmail.com</p>
              </div>
            </div>
            <div className="bg-blue-800/50 rounded-lg p-4 border border-blue-700">
              <p className="text-xs text-blue-200 mb-2">Founded in 2022 by</p>
              <p className="text-yellow-400 font-semibold">SIBOMANA VIATEUR</p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-blue-800/30 rounded-xl p-8 mb-8 border border-blue-700">
          <div className="text-center">
            <h4 className="text-xl font-semibold text-yellow-400 mb-2">Stay Connected</h4>
            <p className="text-blue-100 mb-6">Subscribe to our newsletter for updates on our programs and impact</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-blue-700/50 border border-blue-600 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold rounded-lg transition-colors duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-blue-200">
            </div>
            <div className="text-center md:text-right">
              <p className="text-blue-200 text-sm">
                &copy; 2025 Rise Family Organization. All rights reserved.
              </p>
              <p className="text-blue-300 text-xs mt-1">
                Powered By <a href="https://cbsoft.vercel.app">CBSoft</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"></div>
    </footer>
  );
}
