import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchDonations = async (searchTerm = '') => {
    setLoading(true);
    setError(null);
    try {
      const url = searchTerm
        ? `/api/admin/donations?search=${encodeURIComponent(searchTerm)}`
        : '/api/admin/donations';
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch donations');
      const data = await res.json();
      setDonations(data);
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
      const res = await fetch(`/api/admin/donations/${id}/status`, {
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
      const res = await fetch(`/api/admin/donations/${id}/status`, {
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Donations</h1>
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Search by donor name or email"
          value={search}
          onChange={handleSearchChange}
          className="border p-2 rounded w-full max-w-md"
        />
      </form>
      {loading && <p>Loading donations...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Donor Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Amount</th>
              <th className="border border-gray-300 p-2">Gift</th>
              <th className="border border-gray-300 p-2">Payment</th>
              <th className="border border-gray-300 p-2">Recurring</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Status</th>
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
                  {donation.gift_name ? (
                    <div>
                      <div className="font-semibold">{donation.gift_name}</div>
                      <div className="text-sm text-gray-600">{donation.gift_category}</div>
                    </div>
                  ) : (
                    <span className="text-gray-500">General donation</span>
                  )}
                </td>
                <td className="border border-gray-300 p-2 capitalize">
                  {donation.payment_method || 'N/A'}
                </td>
                <td className="border border-gray-300 p-2">
                  {donation.recurring ? 'Yes' : 'No'}
                </td>
                <td className="border border-gray-300 p-2">{new Date(donation.date).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2 capitalize">{donation.status}</td>
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
    </div>
  );
}
