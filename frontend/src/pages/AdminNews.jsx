import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    image: null
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/admin/news', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNews(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('excerpt', formData.excerpt);
    data.append('category', formData.category);
    if (formData.image) data.append('image', formData.image);

    try {
      if (editingNews) {
        await axios.put(`/api/admin/news/${editingNews.id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/admin/news', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchNews();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this news?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNews();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', excerpt: '', category: '', image: null });
    setEditingNews(null);
    setShowForm(false);
  };

  const startEdit = (newsItem) => {
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      excerpt: newsItem.excerpt,
      category: newsItem.category,
      image: null
    });
    setEditingNews(newsItem);
    setShowForm(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>News Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ backgroundColor: '#3b82f6', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px' }}
        >
          {showForm ? 'Cancel' : 'Add News'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Title:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Content:</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows="10"
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Excerpt:</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows="3"
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Category:</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              style={{ marginTop: '0.25rem' }}
            />
          </div>
          <button type="submit" style={{ backgroundColor: '#10b981', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px' }}>
            {editingNews ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {news.map((item) => (
          <div key={item.id} style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            {item.image_url && (
              <img src={`https://rfo-fyrk.onrender.com${item.image_url}`} alt={item.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '0.5rem' }} />
            )}
            <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{item.title}</h3>
            <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>{item.category}</p>
            <p style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '1rem' }}>{item.excerpt}</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => startEdit(item)} style={{ backgroundColor: '#f59e0b', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>Edit</button>
              <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: '#ef4444', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
