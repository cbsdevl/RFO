import { FaUsers, FaHandHoldingHeart, FaGraduationCap, FaGlobe } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const stats = [
  {
    id: 1,
    title: 'Lives Impacted',
    value: 10000,
    icon: FaUsers,
    suffix: '+',
    color: 'text-blue-500'
  },
  {
    id: 2,
    title: 'Donations Received',
    value: 500000,
    icon: FaHandHoldingHeart,
    prefix: '$',
    color: 'text-green-500'
  },
  {
    id: 3,
    title: 'Programs Completed',
    value: 150,
    icon: FaGraduationCap,
    suffix: '+',
    color: 'text-purple-500'
  },
  {
    id: 4,
    title: 'Communities Served',
    value: 25,
    icon: FaGlobe,
    suffix: '+',
    color: 'text-red-500'
  }
];

export default function Stats() {
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const observers = stats.map((stat, index) => {
      return new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            animateValue(index, 0, stat.value, 2000);
          }
        },
        { threshold: 0.5 }
      );
    });

    const elements = document.querySelectorAll('.stat-item');
    elements.forEach((el, index) => observers[index].observe(el));

    return () => {
      elements.forEach((el, index) => observers[index].unobserve(el));
    };
  }, []);

  const animateValue = (index, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      
      setAnimatedStats(prev => {
        const newStats = [...prev];
        newStats[index] = currentValue;
        return newStats;
      });

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Impact in Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="stat-item bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`${stat.color} p-3 rounded-full bg-gray-50`}>
                    <Icon className="text-3xl" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl md:text-4xl font-bold tracking-tight">
                      {stat.prefix}{animatedStats[index].toLocaleString()}{stat.suffix}
                    </p>
                    <p className="text-gray-600 font-medium">{stat.title}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}