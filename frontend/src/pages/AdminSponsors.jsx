import { useState, useEffect } from 'react';
import { FaEye, FaSearch, FaFilter, FaDollarSign, FaUser, FaCalendarAlt, FaEnvelope, FaPhone, FaEdit, FaSave, FaTimes, FaCheck } from 'react-icons/fa';
import { useToast } from '../context/ToastContext';

export default function AdminSponsors() {
  const { addToast } = useToast();
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState('all');
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [updating, setUpdating] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(null);

  // Fetch sponsors from API
  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/sponsors', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSponsors(data);
      } else {
        console.error('Failed to fetch sponsors');
      }
    } catch (error) {
      console.error('Error fetching sponsors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSponsors = sponsors.filter(sponsor => {
    const matchesSearch = sponsor.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sponsor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sponsor.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = filterProject === 'all' || sponsor.project_id.toString() === filterProject;
    return matchesSearch && matchesProject;
  });

  const totalAmount = sponsors.reduce((sum, s) => {
    const amount = parseFloat(s.sponsorship_amount) || 0;
    return sum + amount;
  }, 0);

  const uniqueSponsors = new Set(
    sponsors
      .map(s => s.email)
      .filter(email => email && email.trim() !== '')
  ).size;

  // Handle editing sponsor
  const handleEditSponsor = (sponsor) => {
    setEditForm({
      status: sponsor.status || 'pending',
      phone: sponsor.phone || '',
      organization: sponsor.organization || '',
      message: sponsor.message || ''
    });
    setIsEditing(true);
  };

  // Handle saving sponsor changes
  const handleSaveSponsor = async () => {
    if (!selectedSponsor) return;

    setUpdating(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/sponsors/${selectedSponsor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        // Refresh sponsors list
        await fetchSponsors();
        setIsEditing(false);
        setEditForm({});
        // Update selected sponsor with new data
        setSelectedSponsor(prev => ({ ...prev, ...editForm }));
      } else {
        console.error('Failed to update sponsor');
      }
    } catch (error) {
      console.error('Error updating sponsor:', error);
    } finally {
      setUpdating(false);
    }
  };

  // Handle canceling edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({});
  };

  // Handle quick status change from table
  const handleQuickStatusChange = async (sponsorId, newStatus) => {
    // Confirmation dialog
    if (!window.confirm(`Are you sure you want to change the sponsor status to "${newStatus}"?`)) {
      return;
    }

    setStatusUpdating(sponsorId);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/sponsors/${sponsorId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Refresh sponsors list
        await fetchSponsors();
        addToast('Sponsor status updated successfully!', 'success');
      } else {
        const errorData = await response.json();
        addToast(`Failed to update sponsor status: ${errorData.error || 'Unknown error'}`, 'error');
        console.error('Failed to update sponsor status');
      }
    } catch (error) {
      addToast('Error updating sponsor status. Please try again.', 'error');
      console.error('Error updating sponsor status:', error);
    } finally {
      setStatusUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sponsors Management</h1>
          <p className="text-gray-600 mt-1">View and manage project sponsors</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <FaDollarSign className="text-green-600 text-2xl mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Sponsorship Amount</p>
              <p className="text-2xl font-bold text-gray-900">${totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <FaUser className="text-blue-600 text-2xl mr-3" />
            <div>
              <p className="text-sm text-gray-600">Unique Sponsors</p>
              <p className="text-2xl font-bold text-gray-900">{uniqueSponsors}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <FaEye className="text-purple-600 text-2xl mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Sponsorships</p>
              <p className="text-2xl font-bold text-gray-900">{sponsors.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search sponsors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Projects</option>
              <option value="1">Education for 100 Children</option>
              <option value="2">Clean Water Initiative</option>
              <option value="3">Healthcare Outreach Program</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sponsors Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sponsor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSponsors.map((sponsor) => (
                <tr key={sponsor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{sponsor.full_name}</div>
                      <div className="text-sm text-gray-500">{sponsor.email}</div>
                      {sponsor.organization && (
                        <div className="text-xs text-gray-400">{sponsor.organization}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{sponsor.project_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600">${sponsor.sponsorship_amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(sponsor.created_at).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(sponsor.created_at).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={sponsor.status || 'pending'}
                      onChange={(e) => handleQuickStatusChange(sponsor.id, e.target.value)}
                      className="px-2 py-1 text-xs font-semibold rounded-full border-0 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[100px] text-center"
                      style={{
                        backgroundColor: sponsor.status === 'completed' ? '#dcfce7' :
                                        sponsor.status === 'pending' ? '#fef3c7' :
                                        sponsor.status === 'approved' ? '#dbeafe' :
                                        '#fee2e2',
                        color: sponsor.status === 'completed' ? '#166534' :
                              sponsor.status === 'pending' ? '#92400e' :
                              sponsor.status === 'approved' ? '#1e40af' :
                              '#991b1b'
                      }}
                    >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="approved">Approved</option>
                  </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedSponsor(sponsor)}
                      className="text-blue-600 hover:text-blue-900"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredSponsors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No sponsors found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Sponsor Details Modal */}
      {selectedSponsor && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedSponsor(null)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                {isEditing ? 'Edit Sponsor Details' : 'Sponsor Details'}
              </h2>
              <div className="flex items-center gap-3">
                {!isEditing && (
                  <button
                    onClick={() => handleEditSponsor(selectedSponsor)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    title="Edit Sponsor"
                  >
                    <FaEdit className="text-sm" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedSponsor(null)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 text-xl rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-4">
                {/* Name and Amount Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded break-words">
                      {selectedSponsor.full_name || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <p className="text-sm text-green-600 font-medium bg-gray-50 px-3 py-2 rounded">
                      ${parseFloat(selectedSponsor.sponsorship_amount || 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded flex items-center break-all">
                    <FaEnvelope className="mr-2 text-gray-400 flex-shrink-0" />
                    {selectedSponsor.email || 'N/A'}
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.phone || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded flex items-center">
                      <FaPhone className="mr-2 text-gray-400 flex-shrink-0" />
                      {selectedSponsor.phone || 'Not provided'}
                    </p>
                  )}
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.organization || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, organization: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter organization name"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded break-words">
                      {selectedSponsor.organization || 'Not provided'}
                    </p>
                  )}
                </div>

                {/* Project */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                  <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded break-words">
                    {selectedSponsor.project_name || 'N/A'}
                  </p>
                </div>

                {/* Sponsored Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sponsored Date</label>
                  <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded flex items-center">
                    <FaCalendarAlt className="mr-2 text-gray-400 flex-shrink-0" />
                    {selectedSponsor.created_at ? new Date(selectedSponsor.created_at).toLocaleString() : 'N/A'}
                  </p>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  {isEditing ? (
                    <textarea
                      value={editForm.message || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px] resize-vertical"
                      placeholder="Enter message"
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded min-h-[60px] whitespace-pre-wrap break-words">
                      {selectedSponsor.message || 'No message provided'}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedSponsor.status === 'completed' ? 'bg-green-100 text-green-800' :
                    selectedSponsor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedSponsor.status || 'Unknown'}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-4 md:p-6 border-t border-gray-200 bg-gray-50">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                    disabled={updating}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSponsor}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center gap-2"
                    disabled={updating}
                  >
                    {updating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="text-sm" />
                        Save Changes
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setSelectedSponsor(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
