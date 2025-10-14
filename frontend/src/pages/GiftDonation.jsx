import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function GiftDonation() {
  const location = useLocation();
  const navigate = useNavigate();
  const gift = location.state?.gift;

  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!gift) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">No gift selected</h2>
        <button
          onClick={() => navigate('/gifts')}
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          Back to Gift Catalog
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: gift.price,
          donor_name: donorName,
          email,
          gift_id: gift.id,
          gift_name: gift.name,
          gift_category: gift.category,
          recurring: false,
        }),
      });

      const data = await response.json();

      if (response.ok && data.payment_link) {
        window.location.href = data.payment_link;
      } else {
        setError(data.error || 'Failed to initiate payment');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-20 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Donate This Gift</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">{gift.name}</h3>
          <p className="text-gray-600 mb-2">{gift.description}</p>
          <p className="text-purple-600 font-bold text-2xl">${gift.price}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="donorName" className="block font-semibold mb-1">Your Name</label>
            <input
              id="donorName"
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {error && <p className="text-red-600 font-semibold">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Donate'}
          </button>
        </form>
      </div>
    </div>
  );
}
