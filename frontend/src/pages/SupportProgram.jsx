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
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
  FaInfoCircle
} from 'react-icons/fa';
import BackButton from '../components/BackButton';

export default function SupportProgram() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [supportType, setSupportType] = useState(null);
  const [isGuidedMode, setIsGuidedMode] = useState(false);
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
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
      name: 'Help Kids Discover Their Talents',
      description: 'This program helps children in Africa explore art, music, sports, and other creative activities. It builds confidence, teaches new skills, and shows kids they can achieve great things.',
      icon: FaPalette,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      supportTypes: [
        {
          type: 'mentorship',
          title: 'Be a Guide for Young People',
          description: 'Spend time talking with kids about your job or hobby. Help them see what they can do in the future. It\'s like being a big brother or sister who shares wisdom and encouragement.',
          icon: FaChalkboardTeacher,
          requirements: ['You need at least 2 years of experience in your field to share real stories', 'Spend about 2 hours per week – maybe one call or meeting', 'We do a simple check to make sure everyone is safe']
        },
        {
          type: 'resources',
          title: 'Donate Supplies',
          description: 'Give art materials like paints and brushes, musical instruments, or sports equipment. These items help kids create and have fun while learning.',
          icon: FaTools,
          requirements: ['Items should be new or gently used and in good condition', 'Make sure they work well – no broken parts', 'Focus on things for art, music, or creative play']
        }
      ]
    },
    {
      id: 'health',
      name: 'Keep Kids Healthy',
      description: 'This program focuses on keeping children healthy through medical care, nutrition education, and wellness activities. It helps prevent sickness and teaches healthy habits.',
      icon: FaHeartbeat,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50',
      supportTypes: [
        {
          type: 'medical',
          title: 'Help with Medical Care',
          description: 'If you\'re a doctor, nurse, or medical worker, volunteer your time to check on kids or give advice. You can also donate things like bandages or vitamins.',
          icon: FaMedkit,
          requirements: ['You must have a valid license to practice medicine', 'Commit to helping for at least one month', 'If you can\'t volunteer time, donating supplies is great too']
        },
        {
          type: 'wellness',
          title: 'Teach About Staying Healthy',
          description: 'Lead fun games and talks about eating right, exercising, and staying clean. Help kids learn how to take care of their bodies and minds.',
          icon: FaHandsHelping,
          requirements: ['Some background in health, teaching, or working with kids', 'Ability to plan and run simple activities', 'Be available regularly, like once a week']
        }
      ]
    },
    {
      id: 'education',
      name: 'Help Kids Learn',
      description: 'This program provides education to children who might not have access to schools. It includes teaching basic subjects, skills training, and giving school supplies.',
      icon: FaGraduationCap,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      supportTypes: [
        {
          type: 'teaching',
          title: 'Teach Kids',
          description: 'Share your knowledge in reading, math, science, or any subject. Help kids learn new things and get excited about school.',
          icon: FaChalkboardTeacher,
          requirements: ['Some experience teaching or working with children', 'Time to meet or talk with kids weekly', 'Plan easy lessons that are fun and simple']
        },
        {
          type: 'materials',
          title: 'Give Learning Tools',
          description: 'Donate books, notebooks, pencils, or computers. These tools help teachers and kids in classrooms and at home.',
          icon: FaBook,
          requirements: ['Use materials that match what kids are learning now', 'Basic school supplies like paper and crayons', 'Fun items like educational games or toys']
        }
      ]
    },
    {
      id: 'employment',
      name: 'Prepare Kids for Jobs',
      description: 'This program helps teenagers and young adults get ready for the working world. It teaches job skills, provides training, and connects kids with job opportunities.',
      icon: FaBriefcase,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      supportTypes: [
        {
          type: 'training',
          title: 'Teach Job Skills',
          description: 'Share what you know about your job. Teach things like computer skills, customer service, or how to run a business.',
          icon: FaLaptop,
          requirements: ['You should be an expert in your field or job', 'Experience showing others how to do things', 'Create simple plans for what you\'ll teach']
        },
        {
          type: 'opportunities',
          title: 'Offer Job Chances',
          description: 'Help kids get real job experience through internships or part-time work. Connect them with companies that need young workers.',
          icon: FaUserGraduate,
          requirements: ['Partner with a company or organization', 'Set up a clear program with goals', 'Provide guidance and feedback to the kids']
        }
      ]
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace console.log with actual form submission logic (e.g., API call)
  };

  const currentStep = selectedProgram ? (supportType ? 3 : 2) : 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
      <div className="container mx-auto px-4">
        <BackButton />
        {/* Support Now Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => {
              setIsGuidedMode(true);
              setCurrentProgramIndex(0);
              setSelectedProgram(null);
              setSupportType(null);
            }}
            className="bg-green-600 text-white px-10 py-4 rounded-lg hover:bg-green-700 transition-colors duration-300 font-bold text-xl shadow-lg"
          >
            Support Now - Get Started!
          </button>
          <p className="text-gray-600 mt-2">Take a guided tour through our programs</p>
        </div>
        {/* Step Indicator */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              1
            </div>
            <FaArrowRight className="text-gray-400" />
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              2
            </div>
            <FaArrowRight className="text-gray-400" />
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              3
            </div>
          </div>
          <div className="flex justify-center mt-2 text-sm text-gray-600">
            <span className={currentStep >= 1 ? 'text-blue-600 font-semibold' : ''}>Choose Program</span>
            <span className="mx-4">→</span>
            <span className={currentStep >= 2 ? 'text-blue-600 font-semibold' : ''}>Select Support Type</span>
            <span className="mx-4">→</span>
            <span className={currentStep >= 3 ? 'text-blue-600 font-semibold' : ''}>Apply</span>
          </div>
        </div>
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Support Our Programs
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 mb-4">
            Choose a program to support and make a lasting impact in our community
          </p>
          <p className="text-lg text-gray-500">
            Whether you want to volunteer your time, share your skills, or donate items, there are many ways to help African children. Follow the steps below to get started – it's easy and rewarding!
          </p>
        </div>

        {/* Step 1: Choose Program */}
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
            Step 1: Choose a Program to Support
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {isGuidedMode
              ? "Let's find the right program for you. Here's one option:"
              : "Tap or click on any program below to select it. You can change your choice anytime."
            }
          </p>
        </div>

        {/* Programs Display */}
        {isGuidedMode ? (
          <div className="max-w-md mx-auto mb-12">
            {(() => {
              const program = programs[currentProgramIndex];
              const Icon = program.icon;
              return (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="text-center">
                    <Icon className="text-6xl text-blue-600 mb-4" />
                    <h3 className="text-2xl font-semibold mb-4">{program.name}</h3>
                    <p className="text-gray-600 mb-6">{program.description}</p>
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      <button
                        onClick={() => {
                          setSelectedProgram(program);
                          setSupportType(null);
                          document.getElementById('support-types').scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        This is for me
                      </button>
                      <button
                        onClick={() => {
                          const nextIndex = (currentProgramIndex + 1) % programs.length;
                          setCurrentProgramIndex(nextIndex);
                        }}
                        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Show me another
                      </button>
                      <button
                        onClick={() => setIsGuidedMode(false)}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Skip to all programs
                      </button>
                    </div>
                    <div className="flex justify-center items-center space-x-4">
                      {currentProgramIndex > 0 && (
                        <button
                          onClick={() => setCurrentProgramIndex(currentProgramIndex - 1)}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                        >
                          <FaArrowLeft /> <span>Back</span>
                        </button>
                      )}
                      <span className="text-gray-500">{currentProgramIndex + 1} of {programs.length}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <div key={program.id} className="relative">
                  <button
                    onClick={() => {
                      setSelectedProgram(program);
                      setSupportType(null);
                      // Scroll to support types
                      document.getElementById('support-types').scrollIntoView({ behavior: 'smooth' });
                    }}
                    title={`Select ${program.name} program`}
                    className={`w-full p-6 rounded-xl transition-all duration-300 ${
                      selectedProgram?.id === program.id
                        ? `bg-gradient-to-r ${program.color} text-white shadow-lg scale-105`
                        : `${program.bgColor} hover:scale-105 hover:shadow-md`
                    }`}
                  >
                    <Icon className="text-4xl mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{program.name}</h3>
                    <p className="text-sm mb-4">{program.description}</p>
                    <div className="text-center">
                      <span className="inline-block bg-white bg-opacity-20 text-sm px-3 py-1 rounded-full">
                        Click to choose this program
                      </span>
                    </div>
                  </button>
                  {selectedProgram?.id === program.id && (
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        Selected ✓
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Continue Button after Program Selection */}
        {selectedProgram && !supportType && (
          <div className="text-center mb-12">
            <button
              onClick={() => {
                // Scroll to support types
                document.getElementById('support-types').scrollIntoView({ behavior: 'smooth' });
              }}
              title="Proceed to select how you want to help"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold text-lg shadow-lg"
            >
              Next: Choose How to Help →
            </button>
          </div>
        )}

        {/* Step 2: Choose Support Type */}
        {selectedProgram && (
          <div className="max-w-4xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
              Step 2: Choose How to Help
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Select one option below that matches how you'd like to support {selectedProgram.name.toLowerCase()}.
            </p>
          </div>
        )}

        {/* Support Types */}
        {selectedProgram && (
          <div id="support-types" className="max-w-4xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedProgram.supportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div key={type.type} className="relative">
                    <button
                      onClick={() => setSupportType(type)}
                      title={`Select ${type.title} option`}
                      className={`w-full p-6 rounded-xl border-2 transition-all duration-300 ${
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
                      <div className="text-center mt-4">
                        <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                          Click to select this option
                        </span>
                      </div>
                    </button>
                    {supportType?.type === type.type && (
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                          Selected ✓
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Continue Button after Support Type Selection */}
            {supportType && (
              <div className="text-center mt-12">
                <button
                  onClick={() => {
                    // Scroll to form
                    document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' });
                  }}
                  title="Proceed to fill out the application form"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold text-lg shadow-lg"
                >
                  Next: Fill Application Form →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Apply */}
        {supportType && (
          <div className="max-w-4xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
              Step 3: Apply to Help
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Fill out the form below to start your journey in supporting {selectedProgram.name.toLowerCase()}.
            </p>
          </div>
        )}

        {/* Support Form */}
        {supportType && (
          <div id="application-form" className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Let's Get You Started!</h2>
              <p className="text-gray-600 mb-6">Fill out this simple form and we'll get back to you soon.</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="(123) 456-7890"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization or Company (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Your organization name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tell Us How You'd Like to Help
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Share your ideas, experience, or what you can offer to support this program. The more details, the better!"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  title="Submit your application to support the program"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold text-lg"
                >
                  Send My Application
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}