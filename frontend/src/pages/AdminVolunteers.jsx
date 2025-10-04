import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchVolunteers = async (searchTerm = '') => {
    setLoading(true);
    setError(null);
    try {
      const url = searchTerm
        ? `/api/admin/volunteers?search=${encodeURIComponent(searchTerm)}`
        : '/api/admin/volunteers';
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch volunteers');
      const data = await res.json();
      setVolunteers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`/api/admin/volunteers/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ status: 'approved' }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      fetchVolunteers(search);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`/api/admin/volunteers/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ status: 'rejected' }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      fetchVolunteers(search);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this volunteer application?')) return;
    try {
      const res = await fetch(`/api/admin/volunteers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete volunteer');
      fetchVolunteers(search);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchVolunteers(search);
  };

  const formatSkills = (skills) => {
    if (!skills || skills.length === 0) return 'None';
    try {
      const parsed = typeof skills === 'string' ? JSON.parse(skills) : skills;
      return parsed.join(', ');
    } catch {
      return skills;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Volunteers</h1>
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          value={search}
          onChange={handleSearchChange}
          className="border p-2 rounded w-full max-w-md"
        />
      </form>
      {loading && <p>Loading volunteers...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Phone</th>
                <th className="border border-gray-300 p-2">Skills</th>
                <th className="border border-gray-300 p-2">Availability</th>
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((volunteer) => (
                <tr key={volunteer.id} className="text-center">
                  <td className="border border-gray-300 p-2">{volunteer.full_name}</td>
                  <td className="border border-gray-300 p-2">{volunteer.email}</td>
                  <td className="border border-gray-300 p-2">{volunteer.phone}</td>
                  <td className="border border-gray-300 p-2 text-sm">{formatSkills(volunteer.skills)}</td>
                  <td className="border border-gray-300 p-2">{volunteer.availability}</td>
                  <td className="border border-gray-300 p-2">{new Date(volunteer.created_at).toLocaleDateString()}</td>
                  <td className="border border-gray-300 p-2 capitalize">{volunteer.status}</td>
                  <td className="border border-gray-300 p-2 space-x-2">
                    {volunteer.status === 'pending' && (
                      <>
                        <Button onClick={() => handleApprove(volunteer.id)} className="bg-green-500 hover:bg-green-600 text-white text-sm">
                          Approve
                        </Button>
                        <Button onClick={() => handleReject(volunteer.id)} className="bg-red-500 hover:bg-red-600 text-white text-sm">
                          Reject
                        </Button>
                      </>
                    )}
                    <Button onClick={() => handleDelete(volunteer.id)} className="bg-gray-500 hover:bg-gray-600 text-white text-sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
