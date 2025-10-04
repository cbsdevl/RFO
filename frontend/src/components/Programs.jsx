import { useState, useEffect } from 'react';
import { 
  FaPalette, 
  FaHeartbeat, 
  FaGraduationCap, 
  FaBriefcase,
  FaChevronRight,
  FaUsers,
  FaHandHoldingHeart,
  FaBook,
  FaStethoscope,
  FaPaintBrush,
  FaLaptopCode,
  FaTheaterMasks
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Programs() {
  const [activeProgram, setActiveProgram] = useState(0);
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

    const section = document.getElementById('programs');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const programs = [
    {
      name: 'Talent Empowerment',
      shortDesc: 'Nurturing creativity and building confidence through talent development',
      description: 'Children in impoverished communities need the essentials: health care, safety and education — that\'s step one. But to truly end generational poverty, children must have hope for the future and see possibilities for themselves beyond their circumstances.',
      icon: FaPalette,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      achievements: [
        'Over 500 children enrolled in talent programs',
        'Regular talent showcase events',
        'Partnerships with local artists and mentors'
      ],
      features: [
        { icon: FaPaintBrush, text: 'Art & Crafts Programs' },
        { icon: FaLaptopCode, text: 'Digital Skills Training' },
        { icon: FaTheaterMasks, text: 'Performing Arts' }
      ]
    },
    {
      name: 'Health',
      shortDesc: 'Providing comprehensive healthcare and wellness support',
      description: 'We help children establish healthy behaviors through comprehensive health programs that address both physical and emotional well-being.',
      icon: FaHeartbeat,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50',
      achievements: [
        'Regular health check-ups for 1000+ children',
        'Dental care program implementation',
        'Mental health support services'
      ],
      features: [
        { icon: FaStethoscope, text: 'Medical Check-ups' },
        { icon: FaUsers, text: 'Mental Health Support' },
        { icon: FaHandHoldingHeart, text: 'Emergency Care' }
      ]
    },
    {
      name: 'Education',
      shortDesc: 'Empowering through quality education and resources',
      description: 'We coordinate with local centers to provide education and skills for job markets, ensuring every child has access to quality education.',
      icon: FaGraduationCap,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      achievements: [
        '2000+ students supported with materials',
        '95% school attendance rate',
        'Scholarship programs for 100+ students'
      ],
      features: [
        { icon: FaBook, text: 'School Supplies' },
        { icon: FaGraduationCap, text: 'Scholarships' },
        { icon: FaUsers, text: 'Mentorship' }
      ]
    },
    {
      name: 'Employment',
      shortDesc: 'Creating pathways to sustainable employment',
      description: 'Our key workforce development program provides access to education, training, personal development and job opportunities.',
      icon: FaBriefcase,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      achievements: [
        '500+ youth placed in jobs',
        '20+ vocational training programs',
        '85% employment success rate'
      ],
      features: [
        { icon: FaBriefcase, text: 'Job Placement' },
        { icon: FaLaptopCode, text: 'Skills Training' },
        { icon: FaHandHoldingHeart, text: 'Career Coaching' }
      ]
    }
  ];

  return (
    <section id="programs" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`max-w-3xl mx-auto text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Programs
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">
            Transforming lives through comprehensive support and development programs
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {programs.map((program, idx) => {
            const Icon = program.icon;
            return (
              <div
                key={program.name}
                className={`transform transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                <div 
                  className={`${program.bgColor} rounded-2xl p-8 h-full hover:shadow-xl transition-shadow relative overflow-hidden cursor-pointer group`}
                  onClick={() => setActiveProgram(idx)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${program.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${program.color} text-white`}>
                        <Icon className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{program.name}</h3>
                        <p className="text-gray-600 mb-4">{program.shortDesc}</p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">Key Features:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {program.features.map((feature, fidx) => (
                            <div key={fidx} className="flex items-center space-x-2">
                              <feature.icon className="text-blue-600" />
                              <span className="text-sm text-gray-600">{feature.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">Achievements:</h4>
                        <ul className="space-y-2">
                          {program.achievements.map((achievement, aidx) => (
                            <li key={aidx} className="flex items-start space-x-2 text-sm text-gray-600">
                              <FaChevronRight className="text-blue-600 mt-1 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-gray-700">{program.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className={`max-w-2xl mx-auto text-center transform transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Link
            to="/support"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            <span>Support Our Programs</span>
            <FaChevronRight />
          </Link>
        </div>
      </div>
    </section>
  );
}