import { FaHeartbeat, FaUserMd, FaStethoscope, FaPills, FaAmbulance, FaCheckCircle, FaStar } from 'react-icons/fa';

export default function ProgramHealth() {
  const services = [
    {
      icon: <FaHeartbeat className="text-red-600 text-3xl" />,
      title: "Preventive Care",
      description: "Regular health check-ups, vaccinations, and wellness programs to prevent illnesses before they occur."
    },
    {
      icon: <FaUserMd className="text-blue-600 text-3xl" />,
      title: "Medical Consultations",
      description: "Access to qualified healthcare professionals for diagnosis, treatment, and ongoing care management."
    },
    {
      icon: <FaPills className="text-green-600 text-3xl" />,
      title: "Medication Support",
      description: "Affordable access to essential medications and assistance with prescription management."
    },
    {
      icon: <FaAmbulance className="text-orange-600 text-3xl" />,
      title: "Emergency Services",
      description: "24/7 emergency response and transportation services for critical health situations."
    }
  ];

  const healthPrograms = [
    {
      title: "Community Health Clinics",
      description: "Mobile and fixed clinics providing comprehensive healthcare services in underserved areas.",
      participants: "2,500+ served monthly"
    },
    {
      title: "Mental Health Support",
      description: "Counseling services, support groups, and mental wellness programs for emotional well-being.",
      participants: "800+ individuals helped"
    },
    {
      title: "Maternal & Child Health",
      description: "Prenatal care, pediatric services, and family planning support for healthy families.",
      participants: "1,200+ mothers and children"
    },
    {
      title: "Chronic Disease Management",
      description: "Ongoing support for managing diabetes, hypertension, and other chronic conditions.",
      participants: "600+ patients monitored"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-red-600 to-red-800">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Health Support Program
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8">
              Comprehensive healthcare services ensuring access to quality medical care for all community members.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-lg font-semibold">10,000+ Patients Served</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-lg font-semibold">50+ Healthcare Partners</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-lg font-semibold">24/7 Emergency Support</span>
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
              Healthcare for Everyone, Everywhere
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our Health Support Program bridges the gap in healthcare access, providing comprehensive medical services,
              preventive care, and emergency support to ensure every community member can live a healthy life.
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

          {/* Health Programs */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Health Initiatives</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {healthPrograms.map((program, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h4>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <span className="text-blue-600 font-semibold">{program.participants}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services Details */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Comprehensive Care Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaStethoscope className="text-blue-600 mr-2" />
                  Primary Care Services
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>General health examinations</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Chronic disease management</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Preventive screenings</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Health education and counseling</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaHeartbeat className="text-red-600 mr-2" />
                  Specialized Care
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>Mental health services</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>Maternal and child health</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>Nutrition and diet counseling</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaStar className="text-yellow-500 flex-shrink-0" />
                    <span>Physical therapy and rehabilitation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Patients Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Medical Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Emergency Support</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Need Health Support?
            </h3>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Our healthcare services are available to all community members. Get the care you need today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule Appointment
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
                Emergency Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
