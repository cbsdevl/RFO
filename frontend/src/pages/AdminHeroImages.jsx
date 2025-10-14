import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';

export default function AdminHeroImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [formData, setFormData] = useState({
    image_url: '',
    alt_text: '',
    display_order: '',
    is_active: true
  });

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://rfo-fyrk.onrender.com/api/admin/hero-images', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch hero images');
      const data = await res.json();
      setImages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingImage ? `https://rfo-fyrk.onrender.com/api/admin/hero-images/${editingImage.id}` : '/api/admin/hero-images';
      const method = editingImage ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save hero image');

      setShowAddForm(false);
      setEditingImage(null);
      setFormData({
        image_url: '',
        alt_text: '',
        display_order: '',
        is_active: true
      });
      fetchImages();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (image) => {
    setEditingImage(image);
    setFormData({
      image_url: image.image_url,
      alt_text: image.alt_text,
      display_order: image.display_order.toString(),
      is_active: image.is_active
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this hero image?')) return;

    try {
      const res = await fetch(`https://rfo-fyrk.onrender.com/api/admin/hero-images/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete hero image');
      fetchImages();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingImage(null);
    setFormData({
      image_url: '',
      alt_text: '',
      display_order: '',
      is_active: true
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Hero Images</h1>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Add New Image
        </Button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingImage ? 'Edit Hero Image' : 'Add New Hero Image'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Alt Text</label>
              <input
                type="text"
                name="alt_text"
                value={formData.alt_text}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Descriptive text for the image"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Display Order</label>
              <input
                type="number"
                name="display_order"
                value={formData.display_order}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="0"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="text-sm font-medium">Active</label>
            </div>
            <div className="flex space-x-2">
              <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
                {editingImage ? 'Update Image' : 'Add Image'}
              </Button>
              <Button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600 text-white">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {loading && <p>Loading hero images...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Alt Text</th>
              <th className="border border-gray-300 p-2">Order</th>
              <th className="border border-gray-300 p-2">Active</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <tr key={image.id} className="text-center">
                <td className="border border-gray-300 p-2">
                  <img src={image.image_url} alt={image.alt_text} className="w-20 h-20 object-cover mx-auto" />
                </td>
                <td className="border border-gray-300 p-2">{image.alt_text}</td>
                <td className="border border-gray-300 p-2">{image.display_order}</td>
                <td className="border border-gray-300 p-2">
                  {image.is_active ? 'Yes' : 'No'}
                </td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <Button onClick={() => handleEdit(image)} className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(image.id)} className="bg-red-500 hover:bg-red-600 text-white text-xs">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
