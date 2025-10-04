import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminChildNeeds() {
  const [childNeeds, setChildNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingChild, setEditingChild] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    problem: '',
    money_needed: '',
    image: null
  });

  useEffect(() => {
    fetchChildNeeds();
  }, []);

  const fetchChildNeeds = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('http://localhost:5000/api/admin/child-needs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChildNeeds(res.data);
    } catch (err) {
      console.error('Error fetching child needs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const data = new FormData();
      data.append('name', formData.name);
      data.append('age', formData.age);
      data.append('location', formData.location);
      data.append('problem', formData.problem);
      data.append('money_needed', formData.money_needed);
      if (formData.image) data.append('image', formData.image);

      if (editingChild) {
        await axios.put(`http://localhost:5000/api/admin/child-needs/${editingChild.id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/admin/child-needs', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      fetchChildNeeds();
      resetForm();
    } catch (err) {
      console.error('Error saving child need:', err);
      alert('Error saving child need');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this child need?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5000/api/admin/child-needs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchChildNeeds();
    } catch (err) {
      console.error('Error deleting child need:', err);
      alert('Error deleting child need');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', age: '', location: '', problem: '', money_needed: '', image: null });
    setEditingChild(null);
    setShowForm(false);
  };

  const startEdit = (child) => {
    setFormData({
      name: child.name,
      age: child.age,
      location: child.location,
      problem: child.problem,
      money_needed: child.money_needed,
      image: null
    });
    setEditingChild(child);
    setShowForm(true);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Child Needs Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ backgroundColor: '#3b82f6', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
        >
          {showForm ? 'Cancel' : 'Add Child Need'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Age</label>
              <input
                type="text"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Problem</label>
              <input
                type="text"
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                required
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Money Needed ($)</label>
              <input
                type="number"
                value={formData.money_needed}
                onChange={(e) => setFormData({ ...formData, money_needed: e.target.value })}
                required
                min="0"
                step="0.01"
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
              />
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button type="submit" style={{ backgroundColor: '#10b981', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}>
              {editingChild ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={resetForm} style={{ backgroundColor: '#6b7280', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {childNeeds.map((child) => (
          <div key={child.id} style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            {child.image_url && (
              <img
                src={`http://localhost:5000${child.image_url}`}
                alt={`Child ${child.id}`}
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '0.5rem' }}
              />
            )}
            <p><strong>Name:</strong> {child.name}</p>
            <p><strong>Age:</strong> {child.age}</p>
            <p><strong>Location:</strong> {child.location}</p>
            <p><strong>Problem:</strong> {child.problem}</p>
            <p><strong>Money Needed:</strong> ${child.money_needed}</p>
            <p><strong>Status:</strong> {child.status}</p>
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => startEdit(child)}
                style={{ backgroundColor: '#3b82f6', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(child.id)}
                style={{ backgroundColor: '#ef4444', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
