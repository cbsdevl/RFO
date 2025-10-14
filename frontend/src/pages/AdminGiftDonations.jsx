import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';

export default function AdminGiftDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [editingPaymentLink, setEditingPaymentLink] = useState(null);
  const [paymentLinkValue, setPaymentLinkValue] = useState('');

  const fetchDonations = async (searchTerm = '') => {
    setLoading(true);
    setError(null);
    try {
      const url = searchTerm
        ? `https://rfo-fyrk.onrender.com/api/admin/donations?search=${encodeURIComponent(searchTerm)}`
        : 'https://rfo-fyrk.onrender.com/api/admin/donations';
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch donations');
      const data = await res.json();
      // Filter only gift donations
      const giftDonations = data.filter(donation => donation.gift_id);
      setDonations(giftDonations);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`https://rfo-fyrk.onrender.com/api/admin/donations/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ status: 'approved' }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      fetchDonations(search);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`https://rfo-fyrk.onrender.com/api/admin/donations/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ status: 'rejected' }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      fetchDonations(search);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDonations(search);
  };

  const handleEditPaymentLink = (id, currentLink) => {
    setEditingPaymentLink(id);
    setPaymentLinkValue(currentLink);
  };

  const handleSavePaymentLink = async (id) => {
    try {
      const res = await fetch(`https://rfo-fyrk.onrender.com/api/admin/donations/${id}/payment-link`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ payment_link: paymentLinkValue }),
      });
      if (!res.ok) throw new Error('Failed to update payment link');
      setEditingPaymentLink(null);
      setPaymentLinkValue('');
      fetchDonations(search);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Gift Donations</h1>
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Search by donor name or email"
          value={search}
          onChange={handleSearchChange}
          className="border p-2 rounded w-full max-w-md"
        />
      </form>
      {loading && <p>Loading gift donations...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Donor Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Amount</th>
              <th className="border border-gray-300 p-2">Gift</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Payment Link</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id} className="text-center">
                <td className="border border-gray-300 p-2">{donation.donor_name}</td>
                <td className="border border-gray-300 p-2">{donation.email}</td>
                <td className="border border-gray-300 p-2">${parseFloat(donation.amount).toFixed(2)}</td>
                <td className="border border-gray-300 p-2">
                  <div>
                    <div className="font-semibold">{donation.gift_name}</div>
                    <div className="text-sm text-gray-600">{donation.gift_category}</div>
                  </div>
                </td>
                <td className="border border-gray-300 p-2">{new Date(donation.date).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2 capitalize">{donation.status}</td>
                <td className="border border-gray-300 p-2">
                  {editingPaymentLink === donation.id ? (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={paymentLinkValue}
                        onChange={(e) => setPaymentLinkValue(e.target.value)}
                        className="border p-1 flex-1"
                        placeholder="Enter payment link"
                      />
                      <Button onClick={() => handleSavePaymentLink(donation.id)} className="bg-blue-500 hover:bg-blue-600 text-white text-xs">
                        Save
                      </Button>
                      <Button onClick={() => setEditingPaymentLink(null)} className="bg-gray-500 hover:bg-gray-600 text-white text-xs">
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="truncate max-w-32">{donation.payment_link || 'N/A'}</span>
                      <Button onClick={() => handleEditPaymentLink(donation.id, donation.payment_link || '')} className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs">
                        Edit
                      </Button>
                    </div>
                  )}
                </td>
                <td className="border border-gray-300 p-2 space-x-2">
                  {donation.status === 'pending' && (
                    <>
                      <Button onClick={() => handleApprove(donation.id)} className="bg-green-500 hover:bg-green-600 text-white">
                        Approve
                      </Button>
                      <Button onClick={() => handleReject(donation.id)} className="bg-red-500 hover:bg-red-600 text-white">
                        Reject
                      </Button>
                    </>
                  )}
                  {(donation.status === 'approved' || donation.status === 'rejected') && <span>No actions</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && !error && donations.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No gift donations found.</p>
      )}
    </div>
  );
}
