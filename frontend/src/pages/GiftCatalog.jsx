import { useState, useEffect, Suspense } from 'react';
import { FaGift, FaHeart, FaShoppingCart, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Lazy import for Navbar

export default function GiftCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      const response = await fetch('https://rfo-fyrk.onrender.com/api/gifts');
      if (!response.ok) {
        throw new Error('Failed to fetch gifts');
      }
      const data = await response.json();
      setGifts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Gifts', icon: FaGift },
    { id: 'education', name: 'Education', icon: FaGift },
    { id: 'talent', name: 'Talent', icon: FaGift },
    { id: 'health', name: 'Health', icon: FaHeart },
    { id: 'basic', name: 'Basic Needs', icon: FaShoppingCart }
  ];

  const filteredGifts = selectedCategory === 'all'
    ? gifts
    : gifts.filter(gift => gift.category === selectedCategory);

  const handleDonate = (gift) => {
    // Navigate to gift donation page with selected gift info as state
    navigate('/giftdonation', { state: { gift } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-20">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Gift Catalog
          </h1>
          <p className="text-xl text-gray-600">
            Choose a gift to make a meaningful impact in a child's life
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-white p-2 shadow-md">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  <Icon />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin text-4xl text-purple-600" />
            <span className="ml-4 text-xl text-gray-600">Loading gifts...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-xl text-red-600 mb-4">Error loading gifts: {error}</p>
            <button
              onClick={fetchGifts}
              className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Gifts Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredGifts.map((gift) => (
              <div
                key={gift.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                  {gift.image_url ? (
                    <img src={`https://rfo-fyrk.onrender.com${gift.image_url}`} alt={gift.name} className="w-full h-full object-cover" />
                  ) : (
                    <FaGift className="text-6xl text-white" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{gift.name}</h3>
                  <p className="text-gray-600 mb-4">{gift.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-purple-600">${gift.price}</span>
                    <span className="text-sm text-gray-500 capitalize">{gift.category}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">Stock: {gift.stock_quantity}</span>
                  </div>
                  <button
                    onClick={() => handleDonate(gift)}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50"
                    disabled={gift.stock_quantity <= 0}
                  >
                    {gift.stock_quantity <= 0 ? 'Out of Stock' : 'Donate This Gift'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Make a Difference Today
          </h2>
          <p className="text-gray-600 mb-6">
            Your gift directly supports children in need. Every contribution counts.
          </p>
          <button className="bg-purple-600 text-white py-3 px-8 rounded-lg hover:bg-purple-700 transition-colors duration-300">
            View All Impact Stories
          </button>
        </div>
      </div>
    </div>
  );
}
