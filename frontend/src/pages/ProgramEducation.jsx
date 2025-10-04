import { FaBook, FaChalkboardTeacher, FaGraduationCap, FaLaptop, FaUsers, FaCheckCircle, FaStar } from 'react-icons/fa';

export default function ProgramEducation() {
  const programs = [
    {
      icon: <FaBook className="text-blue-600 text-3xl" />,
      title: "Literacy Programs",
      description: "Basic reading, writing, and numeracy skills development for children and adults."
    },
    {
      icon: <FaChalkboardTeacher className="text-green-600 text-3xl" />,
      title: "Tutoring Services",
      description: "One-on-one and small group tutoring in core subjects to improve academic performance."
    },
    {
      icon: <FaLaptop className="text-purple-600 text-3xl" />,
      title: "Digital Learning",
      description: "Computer literacy, coding, and digital skills training for the modern workforce."
    },
    {
      icon: <FaGraduationCap className="text-orange-600 text-3xl" />,
      title: "Higher Education Support",
      description: "Scholarships, mentorship, and guidance for pursuing advanced education opportunities."
    }
  ];

  const initiatives = [
    {
      title: "School Supply Distribution",
      description: "Providing essential school supplies to underprivileged children to ensure they can focus on learning.",
      impact: "5,000+ children supported annually"
    },
    {
      title: "After-School Programs",
      description: "Safe learning environments with homework help, enrichment activities, and nutritious meals.",
      impact: "1,200+ students enrolled"
    },
    {
      title: "Teacher Training",
      description: "Professional development programs for educators to improve teaching quality and effectiveness.",
      impact: "300+ teachers trained"
    },
    {
      title: "STEM Education Initiative",
      description: "Science, Technology, Engineering, and Math programs to prepare students for future careers.",
      impact: "800+ students participating"
    }
  ];

  const successMetrics = [
    { label: "Literacy Rate Improvement", value: "85%", icon: <FaBook className="text-blue-600" /> },
    { label: "High School Graduation Rate", value: "92%", icon: <FaGraduationCap className="text-green-600" /> },
    { label: "College Acceptance Rate", value: "78%", icon: <FaUsers className="text-purple-600" /> },
    { label: "Digital Skills Certification", value: "95%", icon: <FaLaptop className="text-orange-600" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-green-600 to-green-800">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Education Program
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8">
              Empowering minds and building futures through comprehensive educational support and opportunities.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-lg font-semibold">8,000+ Students Served</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-lg font-semibold">50+ Schools Partnered</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-lg font-semibold">$2M+ Scholarships Awarded</span>
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
              Education for All, Excellence for Everyone
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our Education Program provides comprehensive learning support from early childhood development through
              higher education, ensuring every child has the opportunity to succeed academically and professionally.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {programs.map((program, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {program.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                    <p className="text-gray-600">{program.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Initiatives */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Educational Initiatives</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {initiatives.map((initiative, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{initiative.title}</h4>
                  <p className="text-gray-600 mb-4">{initiative.description}</p>
                  <div className="bg-green-50 rounded-lg p-3">
                    <span className="text-green-600 font-semibold">{initiative.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Program Details */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Comprehensive Learning Support</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Academic Support Services</h4>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Homework assistance and tutoring</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Test preparation and study skills</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>College and career counseling</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Scholarship and financial aid guidance</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Special education support</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Technology & Resources</h4>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>Computer labs and digital access</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>Online learning platforms</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>Educational software and tools</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>Library resources and databases</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>STEM equipment and materials</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Impact</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {successMetrics.map((metric, index) => (
                <div key={index} className="text-center bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-center mb-3">
                    {metric.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                  <div className="text-gray-600 text-sm">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Invest in Education Today
            </h3>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Help us provide quality education and learning opportunities to children who need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Support Education
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                Volunteer as Tutor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
