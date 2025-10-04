import { useState, useEffect } from 'react';
import { FaHandHoldingHeart } from 'react-icons/fa';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [paraVisible, setParaVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  const images = ['/garuka1.jpg', '/garuka2.jpg', '/garuka3.jpg', '/garuka4.jpg', '/hero-bg.JPG'];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setBadgeVisible(true), 200);
      setTimeout(() => setTitleVisible(true), 400);
      setTimeout(() => setParaVisible(true), 600);
      setTimeout(() => setButtonVisible(true), 800);
    }
  }, [isVisible]);

  return (
    <section
      id="hero-section"
      className="relative text-white overflow-hidden"
    >
      {/* Parallax Background Image */}
      <img
        src={images[currentImageIndex]}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />
      {/* Background overlay pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-30"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10"></div>

      {/* Hero content */}
      <div
        className={`container mx-auto px-4 py-16 md:py-32 flex items-start justify-center relative z-10 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center text-white max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-3xl px-4">
          <span className={`inline-block bg-yellow-400 text-blue-900 text-xs uppercase px-3 py-1 rounded-full mb-4 sm:mb-6 font-semibold tracking-wide shadow-lg transition-all duration-1000 ${badgeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Featured Cause
          </span>
          <h1 className={`text-1xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 drop-shadow-lg transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Donate & Help African Children for Education
          </h1>
          <p className={`mb-6 sm:mb-8 text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md transition-all duration-1000 ${paraVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Empower the future by supporting education for underprivileged African children. Your donation makes a lasting impact.
          </p>
          <button
            className={`inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold px-6 py-2 sm:px-8 sm:py-3 rounded-full shadow-lg hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-1000 text-sm sm:text-base ${buttonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            aria-label="Donate Now"
          >
            <FaHandHoldingHeart className="text-lg sm:text-xl" />
            <span>Donate Now</span>
          </button>
        </div>
      </div>
    </section>
  );
}
