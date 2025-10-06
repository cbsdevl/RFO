import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useContext, useState, lazy, Suspense } from 'react';
import { AdminAuthContext } from '../context/AdminAuthContext';
import { FaBars, FaTimes, FaTachometerAlt, FaDollarSign, FaUsers, FaSignOutAlt } from 'react-icons/fa';

// Lazy import for Navbar

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9fafb' }}>

      {/* Admin Top Bar */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="RFO Logo" className="h-8 w-8 rounded-full" />
          <span className="text-lg font-bold">RFO Admin Panel</span>
        </div>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors">
          Logout
        </button>
      </div>

      {/* Main Layout */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <div style={{ width: '250px', backgroundColor: '#f8fafc', padding: '1rem', borderRight: '1px solid #e5e7eb' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', borderRadius: '4px', textDecoration: 'none', color: '#374151' }}>Dashboard</Link>
            <Link to="/admin/donations" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', borderRadius: '4px', textDecoration: 'none', color: '#374151' }}>Donations</Link>
            <Link to="/admin/help-requests" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', borderRadius: '4px', textDecoration: 'none', color: '#374151' }}>Help Requests</Link>
            <Link to="/admin/volunteers" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', borderRadius: '4px', textDecoration: 'none', color: '#374151' }}>Volunteers</Link>
            <Link to="/admin/child-needs" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', borderRadius: '4px', textDecoration: 'none', color: '#374151' }}>Child Needs</Link>
            <Link to="/admin/news" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', borderRadius: '4px', textDecoration: 'none', color: '#374151' }}>News</Link>
            <Link to="/admin/contact-messages" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', borderRadius: '4px', textDecoration: 'none', color: '#374151' }}>Contact Messages</Link>
            <Link to="/admin/testimonials" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', borderRadius: '4px', textDecoration: 'none', color: '#374151' }}>Testimonials</Link>
            <Link to="/admin/partners" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', borderRadius: '4px', textDecoration: 'none', color: '#374151' }}>Partners</Link>
            <Link to="/admin/sponsor-projects" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', borderRadius: '4px', textDecoration: 'none', color: '#374151' }}>Sponsor Projects</Link>
            <Link to="/admin/sponsors" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', borderRadius: '4px', textDecoration: 'none', color: '#374151' }}>Sponsors</Link>
          </nav>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '1rem' }}>
          <Outlet /> {/* Renders child admin pages */}
        </div>
      </div>
    </div>
  );
}