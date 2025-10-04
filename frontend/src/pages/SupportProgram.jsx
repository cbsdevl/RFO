import { useState } from 'react';
import {
  FaPalette,
  FaHeartbeat,
  FaGraduationCap,
  FaBriefcase,
  FaHandsHelping,
  FaTools,
  FaBook,
  FaChalkboardTeacher,
  FaMedkit,
  FaPaintBrush,
  FaLaptop,
  FaUserGraduate,
  FaCheckCircle
} from 'react-icons/fa';
import BackButton from '../components/BackButton';

export default function SupportProgram() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [supportType, setSupportType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: ''
  });

  const programs = [
    {
      id: 'talent',
      name: 'Talent Empowerment',
      icon: FaPalette,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      supportTypes: [
        {
          type: 'mentorship',
          title: 'Become a Mentor',
          description: 'Share your expertise and guide young talents',
          icon: FaChalkboardTeacher,
          requirements: ['Minimum 2 years experience', 'Weekly 2-hour commitment', 'Background check required']
        },
        {
          type: 'resources',
          title: 'Provide Resources',
          description: 'Donate art supplies, musical instruments, or equipment',
          icon: FaTools,
          requirements: ['New or gently used items', 'Equipment in working condition', 'Educational materials']
        }
      ]
    },
    {
      id: 'health',
      name: 'Health Program',
      icon: FaHeartbeat,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50',
      supportTypes: [
        {
          type: 'medical',
          title: 'Medical Support',
          description: 'Volunteer medical services or provide supplies',
          icon: FaMedkit,
          requirements: ['Valid medical license', 'Monthly commitment', 'Medical supplies donation']
        },
        {
          type: 'wellness',
          title: 'Wellness Programs',
          description: 'Lead health education and wellness activities',
          icon: FaHandsHelping,
          requirements: ['Healthcare background', 'Program development skills', 'Regular availability']
        }
      ]
    },
    {
      id: 'education',
      name: 'Education Program',
      icon: FaGraduationCap,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      supportTypes: [
        {
          type: 'teaching',
          title: 'Volunteer Teaching',
          description: 'Teach specific subjects or skills',
          icon: FaChalkboardTeacher,
          requirements: ['Teaching experience', 'Weekly commitment', 'Lesson planning']
        },
        {
          type: 'materials',
          title: 'Educational Materials',
          description: 'Donate books, school supplies, or learning tools',
          icon: FaBook,
          requirements: ['Current curriculum materials', 'School supplies', 'Learning aids']
        }
      ]
    },
    {
      id: 'employment',
      name: 'Employment Program',
      icon: FaBriefcase,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      supportTypes: [
        {
          type: 'training',
          title: 'Skills Training',
          description: 'Provide vocational or professional training',
          icon: FaLaptop,
          requirements: ['Industry expertise', 'Training experience', 'Curriculum development']
        },
        {
          type: 'opportunities',
          title: 'Job Opportunities',
          description: 'Offer internships or job placements',
          icon: FaUserGraduate,
          requirements: ['Company partnership', 'Structured program', 'Mentorship component']
        }
      ]
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace console.log with actual form submission logic (e.g., API call)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
      <div className="container mx-auto px-4">
        <BackButton />
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Support Our Programs
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">
            Choose a program to support and make a lasting impact in our community
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <button
                key={program.id}
                onClick={() => {
                  setSelectedProgram(program);
                  setSupportType(null);
                }}
                className={`p-6 rounded-xl transition-all duration-300 ${
                  selectedProgram?.id === program.id
                    ? `bg-gradient-to-r ${program.color} text-white shadow-lg scale-105`
                    : `${program.bgColor} hover:scale-105 hover:shadow-md`
                }`}
              >
                <Icon className="text-4xl mb-4" />
                <h3 className="text-lg font-semibold mb-2">{program.name}</h3>
                <p className="text-sm">
                  Click to explore support opportunities
                </p>
              </button>
            );
          })}
        </div>

        {/* Support Types */}
        {selectedProgram && (
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">
              How would you like to support {selectedProgram.name}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedProgram.supportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.type}
                    onClick={() => setSupportType(type)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      supportType?.type === type.type
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-600'
                    }`}
                  >
                    <Icon className="text-3xl text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                    <p className="text-gray-600 mb-4">{type.description}</p>
                    <div className="space-y-2">
                      {type.requirements.map((req, index) => (
                        <div key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Support Form */}
        {supportType && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Complete Your Support Application</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization (if applicable)
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How would you like to contribute?
                  </label>
                  <textarea
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Please describe how you would like to support this program..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Submit Support Application
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}