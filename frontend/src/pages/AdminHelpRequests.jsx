import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminHelpRequests() {
  const [activeTab, setActiveTab] = useState('helpRequests');
  const [requests, setRequests] = useState([]);
  const [childNeeds, setChildNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', search: '' });
  const [childForm, setChildForm] = useState({ age: '', location: '', problem: '', image: null });
  const [editingChild, setEditingChild] = useState(null);

  useEffect(() => {
    if (activeTab === 'helpRequests') {
      fetchRequests();
    } else {
      fetchChildNeeds();
    }
  }, [filter, activeTab]);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams(filter);
      const res = await axios.get(`/api/admin/help-requests?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      setRequests([{ id: 'Error', full_name: 'Failed to load', phone: 'N/A', location: 'N/A', status: 'Error' }]);
    } finally {
      setLoading(false);
    }
  };

  const fetchChildNeeds = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/admin/child-needs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChildNeeds(res.data);
    } catch (err) {
      console.error(err);
      setChildNeeds([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`/api/admin/help-requests/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRequests(); // Refresh list
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  const handleChildSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('age', childForm.age);
    formData.append('location', childForm.location);
    formData.append('problem', childForm.problem);
    if (childForm.image) formData.append('image', childForm.image);

    try {
      if (editingChild) {
        await axios.put(`/api/admin/child-needs/${editingChild.id}`, formData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
        alert('Child need updated');
      } else {
        await axios.post('/api/admin/child-needs', formData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
        alert('Child need created');
      }
      setChildForm({ age: '', location: '', problem: '', image: null });
      setEditingChild(null);
      fetchChildNeeds();
    } catch (err) {
      console.error(err);
      alert('Failed to save child need');
    }
  };

  const editChild = (child) => {
    setEditingChild(child);
    setChildForm({ age: child.age, location: child.location, problem: child.problem, image: null });
  };

  const deleteChild = async (id) => {
    if (!confirm('Delete this child need?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/child-needs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchChildNeeds();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Admin Management</h1>
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => setActiveTab('helpRequests')}
          style={{ padding: '0.5rem 1rem', backgroundColor: activeTab === 'helpRequests' ? '#3b82f6' : '#e5e7eb', color: activeTab === 'helpRequests' ? 'white' : 'black', border: 'none', borderRadius: '4px', marginRight: '0.5rem' }}
        >
          Help Requests
        </button>
        <button
          onClick={() => setActiveTab('childNeeds')}
          style={{ padding: '0.5rem 1rem', backgroundColor: activeTab === 'childNeeds' ? '#3b82f6' : '#e5e7eb', color: activeTab === 'childNeeds' ? 'white' : 'black', border: 'none', borderRadius: '4px' }}
        >
          Child Needs
        </button>
      </div>

      {activeTab === 'helpRequests' && (
        <>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Help Requests</h2>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Search..."
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', marginRight: '0.5rem' }}
            />
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button onClick={fetchRequests} style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', marginLeft: '0.5rem' }}>
              Filter
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb', textAlign: 'left' }}>Phone</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb', textAlign: 'left' }}>Location</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb', textAlign: 'left' }}>Needs</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb', textAlign: 'left' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} style={{ backgroundColor: req.id === 'Error' ? '#fee2e2' : 'white' }}>
                    <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>{req.full_name || 'N/A'}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>{req.phone || 'N/A'}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>{req.location || 'N/A'}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>{req.needs ? JSON.parse(req.needs).join(', ') : 'N/A'}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                      <span style={{ padding: '0.25rem 0.5rem', borderRadius: '9999px', backgroundColor: req.status === 'Pending' ? '#fef3c7' : req.status === 'Approved' ? '#d1fae5' : '#fee2e2', color: '#92400e' }}>
                        {req.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                      <select
                        value={req.status}
                        onChange={(e) => updateStatus(req.id, e.target.value)}
                        style={{ padding: '0.25rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'childNeeds' && (
        <>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Child Needs</h2>
          <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb', textAlign: 'left' }}>Image</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb', textAlign: 'left' }}>Age</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb', textAlign: 'left' }}>Location</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb', textAlign: 'left' }}>Problem</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {childNeeds.map((child) => (
                  <tr key={child.id}>
                    <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                      {child.image_url && <img src={`https://rfo-fyrk.onrender.com${child.image_url}`} alt="Child" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />}
                    </td>
                    <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>{child.age}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>{child.location}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>{child.problem}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>{child.status}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                      <button onClick={() => editChild(child)} style={{ padding: '0.25rem 0.5rem', backgroundColor: '#fbbf24', color: 'white', border: 'none', borderRadius: '4px', marginRight: '0.5rem' }}>Edit</button>
                      <button onClick={() => deleteChild(child.id)} style={{ padding: '0.25rem 0.5rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <form onSubmit={handleChildSubmit} style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>{editingChild ? 'Edit Child Need' : 'Add New Child Need'}</h3>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Age</label>
              <input
                type="text"
                value={childForm.age}
                onChange={(e) => setChildForm({ ...childForm, age: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Location</label>
              <input
                type="text"
                value={childForm.location}
                onChange={(e) => setChildForm({ ...childForm, location: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Problem</label>
              <textarea
                value={childForm.problem}
                onChange={(e) => setChildForm({ ...childForm, problem: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', minHeight: '80px' }}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setChildForm({ ...childForm, image: e.target.files[0] })}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
              />
            </div>
            <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' }}>
              {editingChild ? 'Update' : 'Create'}
            </button>
            {editingChild && (
              <button type="button" onClick={() => { setEditingChild(null); setChildForm({ age: '', location: '', problem: '', image: null }); }} style={{ padding: '0.5rem 1rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', marginLeft: '0.5rem' }}>
                Cancel
              </button>
            )}
          </form>
        </>
      )}
    </div>
  );
}
