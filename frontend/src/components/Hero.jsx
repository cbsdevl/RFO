import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHandHoldingHeart, FaGraduationCap, FaHeartbeat, FaUsers, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [paraVisible, setParaVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('hero-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Fetch hero images from backend
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/hero-images');
        if (!response.ok) {
          throw new Error('Failed to fetch hero images');
        }
        const data = await response.json();
        // Map the data to image URLs, fallback to hardcoded if empty
        const imageUrls = data.length > 0 ? data.map(img => img.image_url) : ['/garuka1.jpg', '/garuka2.jpg', '/garuka3.jpg', '/garuka4.jpg', '/hero-bg.JPG'];
        setImages(imageUrls);
        setError(null);
      } catch (err) {
        console.error('Error fetching hero images:', err);
        setError('Failed to load images');
        // Fallback to hardcoded images
        setImages(['/garuka1.jpg', '/garuka2.jpg', '/garuka3.jpg', '/garuka4.jpg', '/hero-bg.JPG']);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setBadgeVisible(true), 200);
      setTimeout(() => setTitleVisible(true), 400);
      setTimeout(() => setParaVisible(true), 600);
      setTimeout(() => setStatsVisible(true), 800);
      setTimeout(() => setButtonVisible(true), 1000);
    }
  }, [isVisible]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <section
      id="hero-section"
      className="relative text-white overflow-hidden min-h-screen flex items-center"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>

      {/* Animated SVG Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="hero-pattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="10"
                cy="10"
                r="1"
                fill="white"
                className="animate-pulse"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#hero-pattern)"
          />
        </svg>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <FaGraduationCap className="absolute top-20 left-4 sm:left-10 text-yellow-300 opacity-30 text-3xl sm:text-4xl animate-bounce" style={{ animationDelay: '0s' }} />
        <FaHeartbeat className="absolute top-32 sm:top-40 right-4 sm:right-20 text-red-300 opacity-30 text-2xl sm:text-3xl animate-bounce" style={{ animationDelay: '1s' }} />
        <FaUsers className="absolute bottom-32 sm:bottom-40 left-4 sm:left-20 text-green-300 opacity-30 text-4xl sm:text-5xl animate-bounce" style={{ animationDelay: '2s' }} />
        <FaHandHoldingHeart className="absolute bottom-20 right-4 sm:right-10 text-pink-300 opacity-30 text-3xl sm:text-4xl animate-bounce" style={{ animationDelay: '3s' }} />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 py-16 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <span className={`inline-block bg-yellow-400 text-blue-900 text-xs uppercase px-3 py-1 rounded-full mb-4 sm:mb-6 font-semibold tracking-wide shadow-lg transition-all duration-1000 ${badgeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Featured Cause
            </span>
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-4 sm:mb-6 drop-shadow-lg transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Empower African Children Through Education
            </h1>
            <p className={`mb-6 sm:mb-8 text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md transition-all duration-1000 ${paraVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Join us in transforming lives by providing quality education, healthcare, and support to underprivileged children across Africa. Your contribution creates lasting change.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 ${buttonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <button
                className="inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300 text-sm sm:text-base"
                aria-label="Donate Now"
                onClick={() => navigate('/donation')}
              >
                <FaHandHoldingHeart className="text-lg sm:text-xl" />
                <span>Donate Now</span>
              </button>
              <button
                className="inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-transparent border-2 border-white text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg hover:bg-white hover:text-blue-900 hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white text-sm sm:text-base"
                aria-label="Learn More"
                onClick={() => navigate('/about')}
              >
                <span>Learn More</span>
              </button>
            </div>
          </div>

          {/* Image Slider */}
          <div className={`relative transition-all duration-1000 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <div className="relative h-64 sm:h-80 md:h-96">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <div className="text-gray-600">Loading images...</div>
                  </div>
                ) : error ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <div className="text-red-600">{error}</div>
                  </div>
                ) : (
                  images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`NGO impact ${index + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))
                )}
              </div>

              {/* Slider Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Previous image"
              >
                <FaChevronLeft className="text-white text-lg" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Next image"
              >
                <FaChevronRight className="text-white text-lg" />
              </button>

              {/* Slider Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? 'bg-yellow-400' : 'bg-white/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
