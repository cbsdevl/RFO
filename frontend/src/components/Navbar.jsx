import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaSearch,
  FaBars,
  FaTimes,
  FaChevronDown
} from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white flex justify-between items-center px-6 py-2">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-2">
            <img src="/logo.png" alt="Organization Logo" className="h-20 w-auto" />
            <span className="font-bold text-2xl">Rise Family Organization</span>
          </Link>
          {/* Removed social icons for cleaner design */}
        </div>
        <div className="flex items-center space-x-4">
          <Link 
            to="/donation" 
            className="bg-yellow-400 text-blue-900 px-5 py-2 rounded hover:bg-yellow-300 font-bold shadow-lg transition duration-300"
          >
            DONATE NOW
          </Link>
          <Link 
            to="/volunteer" 
            className="bg-white text-blue-900 px-5 py-2 rounded hover:bg-gray-200 font-bold shadow-lg transition duration-300"
          >
            BECOME VOLUNTEER
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-yellow-500 flex items-center justify-between px-6 py-3">
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link 
            to="/" 
            className={`font-semibold hover:text-gray-800 ${isActive('/') ? 'underline' : ''}`}
          >
            HOME
          </Link>
          <Link 
            to="/about" 
            className={`font-semibold hover:text-gray-800 ${isActive('/about') ? 'underline' : ''}`}
          >
            ABOUT
          </Link>
          <Link 
            to="/contact" 
            className={`font-semibold hover:text-gray-800 ${isActive('/contact') ? 'underline' : ''}`}
          >
            CONTACT
          </Link>
          <Link 
            to="/gifts" 
            className={`font-semibold hover:text-gray-800 ${isActive('/gift-catalog') ? 'underline' : ''}`}
          >
            GIFT CATALOG
          </Link>
          <Link 
            to="/register-help" 
            className={`font-semibold hover:text-gray-800 ${isActive('/help-registration') ? 'underline' : ''}`}
          >
            HELP REGISTRATION
          </Link>
          <Link 
            to="/news" 
            className={`font-semibold hover:text-gray-800 ${isActive('/news') ? 'underline' : ''}`}
          >
            NEWS
          </Link>

          {/* Programs Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('programs')}
              className="flex items-center space-x-1 font-semibold hover:text-gray-800 focus:outline-none"
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'programs'}
              aria-controls="programs-menu"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleDropdown('programs');
                }
              }}
            >
              <span>PROGRAMS</span>
              <FaChevronDown className={`transition-transform duration-300 ${activeDropdown === 'programs' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'programs' && (
              <div id="programs-menu" className="absolute bg-white shadow-lg rounded mt-2 py-2 w-48 z-50" role="menu" aria-label="Programs submenu">
                <Link to="/programs/talent" className="block px-4 py-2 text-gray-800 hover:bg-yellow-200" onClick={closeMobileMenu} role="menuitem" tabIndex={0}>Program Talent</Link>
                <Link to="/programs/health" className="block px-4 py-2 text-gray-800 hover:bg-yellow-200" onClick={closeMobileMenu} role="menuitem" tabIndex={0}>Program Health</Link>
                <Link to="/programs/education" className="block px-4 py-2 text-gray-800 hover:bg-yellow-200" onClick={closeMobileMenu} role="menuitem" tabIndex={0}>Program Education</Link>
                <Link to="/programs/employment" className="block px-4 py-2 text-gray-800 hover:bg-yellow-200" onClick={closeMobileMenu} role="menuitem" tabIndex={0}>Program Employment</Link>
              </div>
            )}
          </div>

          <Link 
            to="/support" 
            className={`font-semibold hover:text-gray-800 ${isActive('/support-program') ? 'underline' : ''}`}
          >
            SUPPORT PROGRAM
          </Link>
          <Link 
            to="/vision" 
            className={`font-semibold hover:text-gray-800 ${isActive('/vision-mission') ? 'underline' : ''}`}
          >
            VISION & MISSION
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search Here" 
            className="rounded px-3 py-1 focus:outline-none"
          />
          <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600" />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-black focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-yellow-500 px-6 py-4 space-y-3">
          <Link 
            to="/" 
            className={`block font-semibold hover:text-gray-800 ${isActive('/') ? 'underline' : ''}`}
            onClick={closeMobileMenu}
          >
            HOME
          </Link>
          <Link 
            to="/about" 
            className={`block font-semibold hover:text-gray-800 ${isActive('/about') ? 'underline' : ''}`}
            onClick={closeMobileMenu}
          >
            ABOUT
          </Link>
          <Link 
            to="/contact" 
            className={`block font-semibold hover:text-gray-800 ${isActive('/contact') ? 'underline' : ''}`}
            onClick={closeMobileMenu}
          >
            CONTACT
          </Link>
          <Link 
            to="/gifts" 
            className={`block font-semibold hover:text-gray-800 ${isActive('/gift-catalog') ? 'underline' : ''}`}
            onClick={closeMobileMenu}
          >
            GIFT CATALOG
          </Link>
          <Link 
            to="/register-help" 
            className={`block font-semibold hover:text-gray-800 ${isActive('/help-registration') ? 'underline' : ''}`}
            onClick={closeMobileMenu}
          >
            HELP REGISTRATION
          </Link>
          <Link 
            to="/news" 
            className={`block font-semibold hover:text-gray-800 ${isActive('/news') ? 'underline' : ''}`}
            onClick={closeMobileMenu}
          >
            NEWS
          </Link>

          {/* Programs Accordion */}
          <div>
            <button
              onClick={() => toggleDropdown('programs')}
              className="flex items-center space-x-1 font-semibold hover:text-gray-800 focus:outline-none w-full"
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'programs'}
              aria-controls="programs-menu"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleDropdown('programs');
                }
              }}
            >
              <span>PROGRAMS</span>
              <FaChevronDown className={`transition-transform duration-300 ${activeDropdown === 'programs' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'programs' && (
              <div id="programs-menu" className="pl-4 mt-2 space-y-1" role="menu" aria-label="Programs submenu">
                <Link to="/programs/talent" className="block text-gray-800 hover:text-gray-600" onClick={closeMobileMenu} role="menuitem" tabIndex={0}>Program Talent</Link>
                <Link to="/programs/health" className="block text-gray-800 hover:text-gray-600" onClick={closeMobileMenu} role="menuitem" tabIndex={0}>Program Health</Link>
                <Link to="/programs/education" className="block text-gray-800 hover:text-gray-600" onClick={closeMobileMenu} role="menuitem" tabIndex={0}>Program Education</Link>
                <Link to="/programs/employment" className="block text-gray-800 hover:text-gray-600" onClick={closeMobileMenu} role="menuitem" tabIndex={0}>Program Employment</Link>
              </div>
            )}
          </div>

          <Link 
            to="/support" 
            className={`block font-semibold hover:text-gray-800 ${isActive('/support-program') ? 'underline' : ''}`}
            onClick={closeMobileMenu}
          >
            SUPPORT PROGRAM
          </Link>
          <Link 
            to="/vision" 
            className={`block font-semibold hover:text-gray-800 ${isActive('/vision-mission') ? 'underline' : ''}`}
            onClick={closeMobileMenu}
          >
            VISION & MISSION
          </Link>

          {/* Mobile Search */}
          <div className="relative mt-4">
            <input 
              type="text" 
              placeholder="Search Here" 
              className="w-full rounded px-3 py-2 focus:outline-none"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
          </div>
        </div>
      )}
    </nav>
  );
}
