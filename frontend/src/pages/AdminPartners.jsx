import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaHandshake } from 'react-icons/fa';

export default function AdminPartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    logo_url: '',
    website_url: '',
    description: ''
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://rfo-fyrk.onrender.com/api/admin/partners', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPartners(data);
      } else {
        setError('Failed to fetch partners');
      }
    } catch (error) {
      console.error('Error fetching partners:', error);
      setError('Failed to fetch partners');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const url = editingPartner
        ? `https://rfo-fyrk.onrender.com/api/admin/partners/${editingPartner.id}`
        : 'https://rfo-fyrk.onrender.com/api/admin/partners';
      const method = editingPartner ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchPartners();
        setShowModal(false);
        setEditingPartner(null);
        setFormData({ name: '', category: '', logo_url: '', website_url: '', description: '' });
      } else {
        setError('Failed to save partner');
      }
    } catch (error) {
      console.error('Error saving partner:', error);
      setError('Failed to save partner');
    }
  };

  const handleEdit = (partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      category: partner.category,
      logo_url: partner.logo_url || '',
      website_url: partner.website_url || '',
      description: partner.description || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this partner?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://rfo-fyrk.onrender.com/api/admin/partners/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchPartners();
      } else {
        setError('Failed to delete partner');
      }
    } catch (error) {
      console.error('Error deleting partner:', error);
      setError('Failed to delete partner');
    }
  };

  const openModal = () => {
    setEditingPartner(null);
    setFormData({ name: '', category: '', logo_url: '', website_url: '', description: '' });
    setShowModal(true);
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
          <h1 className="text-3xl font-bold text-gray-900">Partners Management</h1>
          <p className="text-gray-600 mt-1">Manage "Our Partners" section</p>
        </div>
        <button
          onClick={openModal}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FaPlus className="mr-2" />
          Add Partner
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Partners List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {partners.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FaHandshake className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p>No partners yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {partners.map((partner) => (
              <div key={partner.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        {partner.logo_url ? (
                          <img
                            src={partner.logo_url}
                            alt={partner.name}
                            className="w-full h-full object-contain rounded-lg"
                          />
                        ) : (
                          <FaHandshake className="text-gray-400 text-2xl" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {partner.name}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {partner.category}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Name:</span> {partner.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Category:</span> {partner.category}
                        </p>
                        {partner.website_url && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Website:</span>{' '}
                            <a
                              href={partner.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {partner.website_url}
                            </a>
                          </p>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        Created: {new Date(partner.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    {partner.description && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 text-sm">{partner.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="ml-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(partner)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(partner.id)}
                      className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingPartner ? 'Edit Partner' : 'Add New Partner'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Education">Education</option>
                    <option value="Community">Community</option>
                    <option value="Youth">Youth</option>
                    <option value="Government">Government</option>
                    <option value="Funding">Funding</option>
                    <option value="Health">Health</option>
                    <option value="Technology">Technology</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Logo URL (optional)</label>
                  <input
                    type="url"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Website URL (optional)</label>
                  <input
                    type="url"
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {editingPartner ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
