import { useState, useEffect } from 'react';
import {
  FaHandHoldingHeart,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUnity,
  FaHeart,
  FaHandsHelping,
  FaPrayingHands,
  FaUsers,
  FaAward,
  FaGlobe
} from 'react-icons/fa';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const values = [
    { icon: FaPrayingHands, title: 'Spirituality', color: 'text-purple-500', description: 'Guided by faith and moral principles in all our endeavors.' },
    { icon: FaUnity, title: 'Unity', color: 'text-blue-500', description: 'Bringing communities together for collective progress.' },
    { icon: FaHeart, title: 'Love', color: 'text-red-500', description: 'Compassionate care for every individual we serve.' },
    { icon: FaHandsHelping, title: 'Integration', color: 'text-green-500', description: 'Inclusive approach ensuring no one is left behind.' }
  ];

  const stats = [
    { number: '2022', label: 'Founded', icon: FaAward },
    { number: '1000+', label: 'Lives Impacted', icon: FaUsers },
    { number: '5', label: 'Programs', icon: FaGlobe },
    { number: '50+', label: 'Volunteers', icon: FaHandsHelping }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="relative h-[50vh] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About Rise Family Organization
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Empowering communities, transforming lives, and building a brighter future together.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="text-4xl text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Image Gallery */}
            <div className={`relative transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/garuka1.jpg"
                  alt="RFO Activities 1"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <img
                  src="/garuka2.jpg"
                  alt="RFO Activities 2"
                  className="w-full h-48 object-cover rounded-lg shadow-lg mt-8"
                />
                <img
                  src="/garuka3.jpg"
                  alt="RFO Activities 3"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <img
                  src="/garuka4.jpg"
                  alt="RFO Activities 4"
                  className="w-full h-48 object-cover rounded-lg shadow-lg mt-8"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent rounded-lg"></div>
            </div>

            {/* Text Content */}
            <div className={`space-y-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow">
                <FaHandHoldingHeart className="text-4xl text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Rise Family Organization (RFO) is a voluntary non-governmental organization established in 2022 in Rwanda's Eastern Province, Bugesera District, Rilima Sector. Founded by SIBOMANA VIATEUR, we work at a national level to enhance the socio-economic status of underprivileged people, particularly children and youth.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our historical background stems from the founder's personal experiences with hardship in rural communities. With a team of committed individuals, we focus on integrated development through people's participation in key areas: child rights, education, health and hygiene, sustainable livelihood, and women empowerment.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission & Focus</h3>
                <p className="text-gray-600 leading-relaxed">
                  We are dedicated to creating sustainable positive change by addressing the root causes of poverty and inequality. Our integrated approach ensures that we not only provide immediate relief but also build long-term capacity within communities.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className={`transform transition-all duration-700 bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-shadow ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <value.icon className={`text-4xl ${value.color} mx-auto mb-4`} />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h4>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Get In Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a href="tel:+250788854883" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors p-4 rounded-lg hover:bg-blue-50">
                <FaPhone className="text-2xl text-blue-600" />
                <div>
                  <div className="font-semibold">Call Us</div>
                  <div>+250 788 854 883</div>
                </div>
              </a>
              <a href="mailto:risefamilyorganization@gmail.com" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors p-4 rounded-lg hover:bg-blue-50">
                <FaEnvelope className="text-2xl text-blue-600" />
                <div>
                  <div className="font-semibold">Email Us</div>
                  <div>risefamilyorganization@gmail.com</div>
                </div>
              </a>
              <div className="flex items-center space-x-3 text-gray-600 p-4 rounded-lg bg-gray-50">
                <FaMapMarkerAlt className="text-2xl text-blue-600" />
                <div>
                  <div className="font-semibold">Visit Us</div>
                  <div>Rilima Sector, Bugesera District</div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Join Our Mission
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Be part of the change. Whether through volunteering, donations, or partnerships, your support makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/support" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Involved
              </a>
              <a href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
