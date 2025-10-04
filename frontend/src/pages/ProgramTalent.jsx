import { FaGraduationCap, FaUsers, FaLightbulb, FaHandshake, FaStar, FaCheckCircle } from 'react-icons/fa';

export default function ProgramTalent() {
  const features = [
    {
      icon: <FaGraduationCap className="text-blue-600 text-3xl" />,
      title: "Skill Development",
      description: "Comprehensive training programs designed to enhance technical and soft skills for career advancement."
    },
    {
      icon: <FaUsers className="text-green-600 text-3xl" />,
      title: "Mentorship Program",
      description: "One-on-one guidance from industry professionals to help navigate career paths and overcome challenges."
    },
    {
      icon: <FaLightbulb className="text-purple-600 text-3xl" />,
      title: "Innovation Workshops",
      description: "Creative thinking and problem-solving sessions to foster entrepreneurial mindsets."
    },
    {
      icon: <FaHandshake className="text-orange-600 text-3xl" />,
      title: "Networking Opportunities",
      description: "Connect with professionals, alumni, and potential employers through our extensive network."
    }
  ];

  const successStories = [
    {
      name: "Sarah Johnson",
      role: "Software Developer",
      story: "The talent empowerment program gave me the skills and confidence to transition into tech. Now I'm working at a leading tech company and mentoring others.",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Michael Chen",
      role: "Business Analyst",
      story: "Through the mentorship program, I learned valuable skills that helped me secure my dream job. The community support was incredible.",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Emily Rodriguez",
      role: "Project Manager",
      story: "The program not only taught me technical skills but also leadership and communication abilities that I use every day in my career.",
      image: "/api/placeholder/80/80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Talent Empowerment Program
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Unlocking potential and building futures through comprehensive skill development and career guidance.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-lg font-semibold">500+ Graduates</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-lg font-semibold">85% Employment Rate</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-lg font-semibold">50+ Partner Companies</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Overview */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Empowering Dreams, Building Careers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our Talent Empowerment Program provides comprehensive support to help individuals discover their potential,
              develop essential skills, and launch successful careers in their chosen fields.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Program Details */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Program Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">What You'll Learn</h4>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Technical skills in your chosen field</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Professional communication and presentation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Project management and leadership</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Networking and career development</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Entrepreneurial thinking and innovation</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Program Benefits</h4>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>Personalized career counseling</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>Industry-recognized certifications</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>Job placement assistance</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>Alumni network access</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>Continuous support and follow-up</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Success Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{story.name}</h4>
                      <p className="text-gray-600 text-sm">{story.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{story.story}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our Talent Empowerment Program and take the first step towards a brighter future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Apply Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
