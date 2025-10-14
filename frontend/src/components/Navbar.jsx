import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUser,
  FaHeart,
  FaHandsHelping,
  FaDonate,
  FaNewspaper,
  FaInfoCircle,
  FaPhone,
  FaGift,
  FaHome,
  FaCog
} from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
        setIsScrolled(true);
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
        setIsScrolled(currentScrollY > 50);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  const navItems = [
    { path: '/', label: 'HOME', icon: FaHome },
    { path: '/about', label: 'ABOUT', icon: FaInfoCircle },
    { path: '/contact', label: 'CONTACT', icon: FaPhone },
    { path: '/gifts', label: 'GIFT CATALOG', icon: FaGift },
    { path: '/news', label: 'NEWS', icon: FaNewspaper },
  ];

  const getInvolvedItems = [
    { path: '/sponsor-projects', label: 'Sponsor Project', icon: FaHandsHelping },
    { path: '/support', label: 'Support Our Programs', icon: FaHeart },
    { path: '/register-help', label: 'Get Help', icon: FaUser },
    { path: '/volunteer', label: 'Volunteer', icon: FaHandsHelping },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'} ${isScrolled ? 'shadow-2xl backdrop-blur-md bg-white/95' : ''}`}>
      {/* Top Bar with Gradient */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse"></div>
        </div>

        <div className="relative flex flex-col sm:flex-row justify-between items-center px-6 py-3">
          <div className="flex items-center space-x-4">
            {/* Enhanced Logo */}
            <Link to="/" onClick={() => setIsOpen(false)} className="group flex items-center space-x-3 transition-transform duration-300 hover:scale-105">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Organization Logo"
                  className="h-14 md:h-16 w-auto rounded-full border-2 border-yellow-400 shadow-lg transition-all duration-300 group-hover:shadow-yellow-400/50"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                  Rise Family Organization
                </span>
                <span className="text-xs text-blue-200 font-medium">Empowering Futures</span>
              </div>
            </Link>
          </div>

          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0 items-center mt-4 sm:mt-0">
            {/* Enhanced Action Buttons */}
            <Link
              to="/donation"
              className="group relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-4 py-2 md:px-6 md:py-3 rounded-full font-bold shadow-lg transition-all duration-300 hover:shadow-yellow-400/50 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <FaDonate className="text-sm" />
                <span>DONATE CHILD</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              to="/volunteer"
              className="group relative bg-white text-blue-900 px-4 py-2 md:px-6 md:py-3 rounded-full font-bold shadow-lg transition-all duration-300 hover:shadow-white/50 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <FaHandsHelping className="text-sm" />
                <span>BECOME VOLUNTEER</span>
              </span>
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              to="/admin/login"
              className="group relative bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-bold shadow-lg transition-all duration-300 hover:shadow-purple-500/50 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <FaCog className="text-sm" />
                <span>SMART ADMIN</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Bar */}
      <div className={`relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:20px_20px]"></div>
        </div>

        <div className="relative flex items-center justify-between px-6">
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative font-bold text-blue-900 hover:text-white transition-all duration-300 ${isActive(item.path) ? 'text-white' : ''}`}
                >
                  <span className="flex items-center space-x-2 relative z-10">
                    <Icon className="text-sm" />
                    <span>{item.label}</span>
                  </span>
                  <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full ${isActive(item.path) ? 'w-full' : ''}`}></div>
                  <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
                </Link>
              );
            })}

            {/* Enhanced Get Involved Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('get-involved')}
                className="group flex items-center space-x-2 font-bold text-blue-900 hover:text-white focus:outline-none transition-all duration-300"
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'get-involved'}
                aria-controls="get-involved-menu"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleDropdown('get-involved');
                  }
                }}
              >
                <FaHandsHelping className="text-sm" />
                <span>GET INVOLVED</span>
                <FaChevronDown className={`transition-transform duration-300 ${activeDropdown === 'get-involved' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'get-involved' && (
                <div id="get-involved-menu" className="absolute bg-white shadow-2xl rounded-xl mt-3 py-3 w-64 z-50 border border-yellow-200 overflow-hidden" role="menu" aria-label="Get Involved submenu">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-white"></div>
                  <div className="relative">
                    {getInvolvedItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="group flex items-center space-x-3 px-4 py-3 text-gray-800 hover:bg-yellow-100 hover:text-blue-900 transition-all duration-300"
                          onClick={closeMobileMenu}
                          role="menuitem"
                          tabIndex={0}
                        >
                          <Icon className="text-yellow-500 group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-medium">{item.label}</span>
                          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="relative hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Here..."
                className="w-64 px-4 py-2 pr-12 rounded-full bg-white/90 backdrop-blur-sm border-2 border-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <FaSearch size={16} />
              </button>
            </form>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            className="md:hidden relative w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-900 focus:outline-none transition-all duration-300 hover:bg-white/30 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
              <span className={`absolute block w-6 h-0.5 bg-current top-3 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-yellow-400 to-yellow-500 px-6 py-6 space-y-4 shadow-2xl">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Here..."
              className="w-full px-4 py-3 pr-12 rounded-full bg-white/90 backdrop-blur-sm border-2 border-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-600"
            >
              <FaSearch size={16} />
            </button>
          </form>

          {/* Mobile Navigation Links */}
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center space-x-3 font-bold text-blue-900 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/20 ${isActive(item.path) ? 'bg-white/30 text-white' : ''}`}
                onClick={closeMobileMenu}
              >
                <Icon className="text-lg" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Mobile Get Involved Accordion */}
          <div className="space-y-2">
            <button
              onClick={() => toggleDropdown('get-involved')}
              className="group flex items-center justify-between w-full font-bold text-blue-900 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/20"
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'get-involved'}
              aria-controls="get-involved-mobile-menu"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleDropdown('get-involved');
                }
              }}
            >
              <div className="flex items-center space-x-3">
                <FaHandsHelping className="text-lg" />
                <span>GET INVOLVED</span>
              </div>
              <FaChevronDown className={`transition-transform duration-300 ${activeDropdown === 'get-involved' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'get-involved' && (
              <div id="get-involved-mobile-menu" className="pl-8 space-y-2 mt-2" role="menu" aria-label="Get Involved submenu">
                {getInvolvedItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="group flex items-center space-x-3 text-blue-800 hover:text-white transition-all duration-300 py-2 px-4 rounded-lg hover:bg-white/20"
                      onClick={closeMobileMenu}
                      role="menuitem"
                      tabIndex={0}
                    >
                      <Icon className="text-sm" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
