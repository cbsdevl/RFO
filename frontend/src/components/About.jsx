import { useState, useEffect } from 'react';
import { 
  FaHandHoldingHeart, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaUnity, 
  FaHeart, 
  FaHandsHelping,
  FaPrayingHands 
} from 'react-icons/fa';

export default function About() {
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

    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const values = [
    { icon: FaPrayingHands, title: 'Spirituality', color: 'text-purple-500' },
    { icon: FaUnity, title: 'Unity', color: 'text-blue-500' },
    { icon: FaHeart, title: 'Love', color: 'text-red-500' },
    { icon: FaHandsHelping, title: 'Integration', color: 'text-green-500' }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`max-w-3xl mx-auto text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Rise Family Organization
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">
            Empowering communities, transforming lives, and building a brighter future together.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image Gallery */}
          <div className={`relative transform transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
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
          <div className={`space-y-6 transform transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow">
              <FaHandHoldingHeart className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Rise Family Organization (RFO) is a voluntary non-governmental organization established in 2022 in Rwanda's Eastern Province, Bugesera District, Rilima Sector. Founded by SIBOMANA VIATEUR, we work at a national level to enhance the socio-economic status of underprivileged people, particularly children and youth.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission & Focus</h3>
              <p className="text-gray-600 leading-relaxed">
                Our historical background stems from the founder's personal experiences with hardship in rural communities. With a team of committed individuals, we focus on integrated development through people's participation in key areas: child rights, education, health and hygiene, sustainable livelihood, and women empowerment.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`transform transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-shadow">
                  <value.icon className={`text-4xl ${value.color} mx-auto mb-4`} />
                  <h4 className="text-xl font-semibold text-gray-900">{value.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a href="tel:+250788854883" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                <FaPhone className="text-2xl text-blue-600" />
                <span>+250 788 854 883</span>
              </a>
              <a href="mailto:risefamilyorganization@gmail.com" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                <FaEnvelope className="text-2xl text-blue-600" />
                <span>Email Us</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-600">
                <FaMapMarkerAlt className="text-2xl text-blue-600" />
                <span>Rilima Sector, Bugesera District</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}