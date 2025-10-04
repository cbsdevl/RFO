import { useState, useEffect } from 'react';
import { FaLightbulb, FaCrosshairs, FaBullseye, FaCheck, FaArrowRight } from 'react-icons/fa';
import BackButton from './BackButton';

export default function VisionMission() {
  const [activeTab, setActiveTab] = useState('vision');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('vision-mission');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const missionPoints = [
    {
      id: 1,
      text: "Develop the children and youth's talents",
      icon: "🎨"
    },
    {
      id: 2,
      text: "Promote human and children's rights",
      icon: "⚖️"
    },
    {
      id: 3,
      text: "Make the children and youth leave the roads",
      icon: "🏠"
    },
    {
      id: 4,
      text: "Help youth from formation centres achieve self-reliance",
      icon: "💪"
    },
    {
      id: 5,
      text: "Help children who dropped out to return to school",
      icon: "📚"
    },
    {
      id: 6,
      text: "Fight against drugs and child exploitation",
      icon: "🛡️"
    },
    {
      id: 7,
      text: "Help improve social welfare for those in need",
      icon: "❤️"
    },
    {
      id: 8,
      text: "Support children with disabilities in education and society",
      icon: "🌟"
    }
  ];

  const goals = [
    {
      title: "Education",
      description: "Providing quality education and skills training",
      icon: "📖",
      color: "bg-blue-500"
    },
    {
      title: "Health",
      description: "Ensuring access to healthcare and well-being",
      icon: "🏥",
      color: "bg-green-500"
    },
    {
      title: "Talent",
      description: "Empowering youth through talent development",
      icon: "🎯",
      color: "bg-purple-500"
    },
    {
      title: "Employment",
      description: "Creating opportunities for sustainable livelihoods",
      icon: "💼",
      color: "bg-orange-500"
    }
  ];

  return (
    <section id="vision-mission" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Vision, Mission & Goals
          </h2>
          <p className="text-lg text-gray-600">
            Working together to create lasting positive change in our community
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-gray-100 p-2">
            {['vision', 'mission', 'goals'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-6xl mx-auto">
          {/* Vision Section */}
          <div className={`transition-all duration-500 ${
            activeTab === 'vision' ? 'block opacity-100' : 'hidden opacity-0'
          }`}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 bg-blue-600 text-white p-12 flex items-center">
                  <div>
                    <FaLightbulb className="text-5xl mb-6 text-yellow-300" />
                    <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                    <p className="text-xl leading-relaxed text-blue-100">
                      Building brighter futures through equipping the young generation with the tools,
                      knowledge, and opportunities they need to succeed.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 p-12">
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold text-gray-900">We Envision:</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start space-x-3">
                        <FaCheck className="text-green-500 mt-1" />
                        <span>A world where every child has access to quality education</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <FaCheck className="text-green-500 mt-1" />
                        <span>Communities empowered through youth development</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <FaCheck className="text-green-500 mt-1" />
                        <span>Sustainable positive impact on future generations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className={`transition-all duration-500 ${
            activeTab === 'mission' ? 'block opacity-100' : 'hidden opacity-0'
          }`}>
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {missionPoints.map((point, index) => (
                  <div
                    key={point.id}
                    className={`transform transition-all duration-500 ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="bg-blue-50 rounded-xl p-6 h-full hover:shadow-lg transition-shadow">
                      <div className="text-3xl mb-4">{point.icon}</div>
                      <p className="text-gray-700">{point.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Goals Section */}
          <div className={`transition-all duration-500 ${
            activeTab === 'goals' ? 'block opacity-100' : 'hidden opacity-0'
          }`}>
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-12">
                  <FaBullseye className="text-4xl text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Our Primary Goal</h3>
                  <p className="text-lg text-gray-600 mt-2">
                    Overall Socio-Protection of underprivileged people, especially Youth and children
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {goals.map((goal, index) => (
                    <div
                      key={goal.title}
                      className={`transform transition-all duration-500 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative bg-white rounded-xl p-6 border border-gray-100 group-hover:border-transparent transition-colors duration-300">
                          <div className="text-3xl mb-4">{goal.icon}</div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-white transition-colors duration-300">
                            {goal.title}
                          </h4>
                          <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                            {goal.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}