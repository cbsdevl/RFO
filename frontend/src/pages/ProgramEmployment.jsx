import { FaBriefcase, FaSearch, FaHandshake, FaTools, FaUserTie, FaCheckCircle, FaStar } from 'react-icons/fa';

export default function ProgramEmployment() {
  const services = [
    {
      icon: <FaSearch className="text-blue-600 text-3xl" />,
      title: "Job Search Assistance",
      description: "Resume writing, interview preparation, and job matching services to help you find the right opportunity."
    },
    {
      icon: <FaTools className="text-green-600 text-3xl" />,
      title: "Skills Training",
      description: "Workforce development programs teaching essential job skills and industry-specific certifications."
    },
    {
      icon: <FaHandshake className="text-purple-600 text-3xl" />,
      title: "Employer Partnerships",
      description: "Direct connections with local businesses and organizations for job placement and internships."
    },
    {
      icon: <FaUserTie className="text-orange-600 text-3xl" />,
      title: "Career Counseling",
      description: "Professional guidance for career planning, advancement, and long-term professional development."
    }
  ];

  const programs = [
    {
      title: "Youth Employment Initiative",
      description: "Entry-level job training and placement for young adults aged 18-24 entering the workforce.",
      participants: "500+ youth placed annually"
    },
    {
      title: "Reentry Support Program",
      description: "Employment assistance for individuals returning to the workforce after incarceration or hiatus.",
      participants: "200+ individuals supported"
    },
    {
      title: "Senior Workforce Program",
      description: "Age-friendly job opportunities and training for experienced professionals aged 50+.",
      participants: "150+ seniors employed"
    },
    {
      title: "Entrepreneurship Bootcamp",
      description: "Business training and startup support for aspiring entrepreneurs in the community.",
      participants: "100+ businesses launched"
    }
  ];

  const employers = [
    { name: "TechCorp Solutions", jobs: "25 positions filled" },
    { name: "Community Hospital", jobs: "30 positions filled" },
    { name: "Green Manufacturing", jobs: "20 positions filled" },
    { name: "Local Retail Chain", jobs: "40 positions filled" },
    { name: "City Services", jobs: "35 positions filled" },
    { name: "Education District", jobs: "15 positions filled" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Employment Program
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8">
              Connecting talent with opportunity through comprehensive job training and placement services.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-lg font-semibold">1,200+ Jobs Created</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-lg font-semibold">85% Placement Rate</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-lg font-semibold">50+ Partner Employers</span>
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
              Building Careers, Strengthening Communities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our Employment Program bridges the gap between job seekers and employers, providing comprehensive
              training, placement services, and career development support to create sustainable employment opportunities.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Employment Programs */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Specialized Employment Programs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programs.map((program, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h4>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <span className="text-purple-600 font-semibold">{program.participants}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services Details */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Comprehensive Employment Support</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaBriefcase className="text-blue-600 mr-2" />
                  Job Readiness Services
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Resume and cover letter assistance</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Interview skills training</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Professional attire support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Transportation assistance</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Job search workshops</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaUserTie className="text-purple-600 mr-2" />
                  Career Development
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>Career counseling and planning</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>Skills assessment and gap analysis</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>Certification programs</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>Leadership development</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>Networking opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Partner Employers */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Partner Employers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employers.map((employer, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{employer.name}</h4>
                  <div className="bg-green-50 rounded-lg p-2">
                    <span className="text-green-600 font-semibold text-sm">{employer.jobs}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1,200+</div>
              <div className="text-gray-600">Jobs Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-gray-600">Placement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">$45K</div>
              <div className="text-gray-600">Avg Starting Salary</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">92%</div>
              <div className="text-gray-600">Job Retention Rate</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Find Your Next Opportunity?
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join our Employment Program and get the support you need to launch or advance your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Your Job Search
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Hire Through Our Program
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
