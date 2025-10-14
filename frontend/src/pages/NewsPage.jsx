import { useState, useEffect } from 'react';
import { FaCalendar, FaSearch } from 'react-icons/fa';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNews, setFilteredNews] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        setNews(data);
        setFilteredNews(data);
      })
      .catch(err => console.error('Error fetching news:', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filtered = news.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
    setFilteredNews(filtered);
  }, [searchTerm, news]);

  if (loading) return <div className="text-center py-10">Loading news...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search */}
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="py-4">
            <div className="relative flex-1 max-w-lg">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search news..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                {item.image_url ? (
                  <img
                    src={`https://rfo-fyrk.onrender.com${item.image_url}`}
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
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Results Found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
