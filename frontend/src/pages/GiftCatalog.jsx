import { useState, Suspense } from 'react';
import { FaGift, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Lazy import for Navbar

export default function GiftCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGift, setSelectedGift] = useState(null);
  const navigate = useNavigate();

  const gifts = [
    {
      id: 1,
      name: 'School Supplies Kit',
      category: 'education',
      price: 25,
      image: '/gift1.jpg',
      description: 'Complete set of notebooks, pencils, erasers, and rulers for a student.',
      impact: 'Helps a child stay focused on learning'
    },
    {
      id: 2,
      name: 'Art Supplies Set',
      category: 'talent',
      price: 30,
      image: '/gift2.jpg',
      description: 'Colors, brushes, sketchbook, and craft materials for creative expression.',
      impact: 'Nurtures artistic talents and creativity'
    },
    {
      id: 3,
      name: 'Sports Equipment',
      category: 'health',
      price: 40,
      image: '/gift3.jpg',
      description: 'Football, basketball, or other sports gear for physical activity.',
      impact: 'Promotes healthy lifestyle and teamwork'
    },
    {
      id: 4,
      name: 'Books Collection',
      category: 'education',
      price: 35,
      image: '/gift4.jpg',
      description: 'Age-appropriate storybooks and educational materials.',
      impact: 'Builds reading habits and knowledge'
    },
    {
      id: 5,
      name: 'Hygiene Kit',
      category: 'health',
      price: 20,
      image: '/gift5.jpg',
      description: 'Soap, toothbrush, toothpaste, and other personal care items.',
      impact: 'Maintains health and dignity'
    },
    {
      id: 6,
      name: 'Winter Clothing',
      category: 'basic',
      price: 45,
      image: '/gift6.jpg',
      description: 'Warm jacket, sweater, and accessories for cold weather.',
      impact: 'Provides comfort and protection'
    }
  ];

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
    // Navigate to donation page with selected gift info as state
    navigate('/donation', { state: { gift } });
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

        {/* Gifts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredGifts.map((gift) => (
            <div
              key={gift.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <FaGift className="text-6xl text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{gift.name}</h3>
                <p className="text-gray-600 mb-4">{gift.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-purple-600">${gift.price}</span>
                  <span className="text-sm text-gray-500 capitalize">{gift.category}</span>
                </div>
                <p className="text-sm text-green-600 mb-4 italic">
                  {gift.impact}
                </p>
                <button
                  onClick={() => handleDonate(gift)}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  Donate This Gift
                </button>
              </div>
            </div>
          ))}
        </div>

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
