import { FaCalendar, FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function LatestNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(data => setNews(data.slice(0, 3))) // Show latest 3
      .catch(err => console.error('Error fetching news:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10">Loading news...</div>;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Latest News</h2>
          <a
            href="/news"
            className="hidden md:flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>View All News</span>
            <FaArrowRight className="text-sm" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                {item.image_url ? (
                  <img
                    src={`http://localhost:5000${item.image_url}`}
                    alt={item.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-2 text-gray-500 mb-3">
                  <FaCalendar className="text-blue-600" />
                  <span className="text-sm">{item.date}</span>
                </div>

                <h3 className="text-xl font-bold mb-3 hover:text-blue-600 transition-colors">
                  <a href={`/news/${item.id}`}>{item.title}</a>
                </h3>

                <p className="text-gray-600 mb-4">{item.excerpt}</p>

                <a
                  href={`/news/${item.id}`}
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <span>Read More</span>
                  <FaArrowRight className="text-sm" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="/news"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>View All News</span>
            <FaArrowRight className="text-sm" />
          </a>
        </div>
      </div>
    </section>
  );
}