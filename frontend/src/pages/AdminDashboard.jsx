import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ donations: 0, totalDonated: 0, helpRequests: 0, pendingRequests: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          setStats({ donations: 'No token', totalDonated: 'No token', helpRequests: 'No token', pendingRequests: 'No token' });
          return;
        }
        const res = await axios.get('http://localhost:5000/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
        if (err.response && err.response.status === 401) {
          setStats({ donations: 'Unauthorized', totalDonated: 'Unauthorized', helpRequests: 'Unauthorized', pendingRequests: 'Unauthorized' });
        } else {
          setStats({ donations: 'Failed to load', totalDonated: 'Failed to load', helpRequests: 'Failed to load', pendingRequests: 'Failed to load' });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading Dashboard...</div>;

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Admin Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Donations</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>{stats.donations}</p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Donated</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>${stats.totalDonated}</p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280' }}>Help Requests</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>{stats.helpRequests}</p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280' }}>Pending Requests</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>{stats.pendingRequests}</p>
        </div>
      </div>
    </div>
  );
}