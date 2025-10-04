import { useState, useEffect } from 'react';
import { FaHandHoldingHeart } from 'react-icons/fa';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  return (
    <section
      id="hero-section"
      className="relative bg-gradient-to-br from-blue-600 via-blue-800 to-indigo-900 text-white overflow-hidden"
    >
      {/* Background overlay pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-80"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10"></div>

      {/* Hero content */}
      <div
        className={`container mx-auto px-4 py-28 flex flex-col md:flex-row items-center relative z-10 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="md:w-1/2 text-white">
          <span className="inline-block bg-yellow-400 text-blue-900 text-xs uppercase px-3 py-1 rounded-full mb-6 font-semibold tracking-wide shadow-lg">
            Featured Cause
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            Donate & Help African Children for Education
          </h1>
          <p className="mb-8 max-w-lg text-lg md:text-xl leading-relaxed drop-shadow-md">
            Empower the future by supporting education for underprivileged African children. Your donation makes a lasting impact.
          </p>
          <button
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold px-8 py-3 rounded-full shadow-lg hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300"
            aria-label="Donate Now"
          >
            <FaHandHoldingHeart className="text-xl" />
            <span>Donate Now</span>
          </button>
        </div>
      <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
        <div className="relative w-full min-h-[300px] sm:min-h-[400px] md:min-h-[384px] overflow-hidden rounded-3xl shadow-2xl">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="African children"
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out ${
                index === currentImageIndex ? 'translate-x-0' : index < currentImageIndex ? '-translate-x-full' : 'translate-x-full'
              }`}
            />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
