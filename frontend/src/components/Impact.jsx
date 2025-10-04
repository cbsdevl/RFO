import { FaCheck } from 'react-icons/fa';

const impactAreas = [
  {
    title: "Education & Skills",
    description: "Providing quality education and skills training to underprivileged youth.",
    achievements: [
      "1,000+ students enrolled in educational programs",
      "95% program completion rate",
      "80% job placement success"
    ]
  },
  {
    title: "Community Development",
    description: "Building stronger, more resilient communities through targeted initiatives.",
    achievements: [
      "25 communities supported",
      "50+ local partnerships established",
      "100+ community events organized"
    ]
  },
  {
    title: "Youth Empowerment",
    description: "Empowering young people to become leaders in their communities.",
    achievements: [
      "500+ youth leadership graduates",
      "30 youth-led projects launched",
      "200+ mentorship connections"
    ]
  }
];

export default function Impact() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact Areas</h2>
          <p className="text-gray-600 text-lg">
            We focus on creating lasting positive change through these key areas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {impactAreas.map((area, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-blue-600">{area.title}</h3>
                <p className="text-gray-600">{area.description}</p>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Key Achievements:</h4>
                  <ul className="space-y-3">
                    {area.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-1">
                          <FaCheck className="text-green-500 text-sm" />
                        </div>
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`/impact/${area.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  className="inline-block text-blue-600 hover:text-blue-700 font-medium"
                >
                  Learn more about our {area.title} initiatives →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/impact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            View Full Impact Report
          </a>
        </div>
      </div>
    </section>
  );
}