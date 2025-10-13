import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';

export default function AdminGifts() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGift, setEditingGift] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock_quantity: '',
    is_active: true
  });

  const fetchGifts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/gifts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch gifts');
      const data = await res.json();
      setGifts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'imageFile') {
      setFormData(prev => ({
        ...prev,
        imageFile: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingGift ? `/api/admin/gifts/${editingGift.id}` : '/api/admin/gifts';
      const method = editingGift ? 'PUT' : 'POST';

      const formPayload = new FormData();
      formPayload.append('name', formData.name);
      formPayload.append('description', formData.description);
      formPayload.append('price', formData.price);
      formPayload.append('category', formData.category);
      formPayload.append('stock_quantity', formData.stock_quantity);
      formPayload.append('is_active', formData.is_active ? '1' : '0');
      if (formData.imageFile) {
        formPayload.append('image', formData.imageFile);
      }

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: formPayload,
      });

      if (!res.ok) throw new Error('Failed to save gift');

      setShowAddForm(false);
      setEditingGift(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock_quantity: '',
        is_active: true,
        imageFile: null,
      });
      fetchGifts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (gift) => {
    setEditingGift(gift);
    setFormData({
      name: gift.name,
      description: gift.description,
      price: gift.price.toString(),
      category: gift.category,
      stock_quantity: gift.stock_quantity.toString(),
      is_active: gift.is_active
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this gift?')) return;

    try {
      const res = await fetch(`/api/admin/gifts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete gift');
      fetchGifts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingGift(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock_quantity: '',
      is_active: true
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Gifts</h1>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Add New Gift
        </Button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingGift ? 'Edit Gift' : 'Add New Gift'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {formData.imageFile && (
            <img
              src={URL.createObjectURL(formData.imageFile)}
              alt="Preview"
              className="mt-2 max-h-40 object-contain"
            />
          )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
                rows="3"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stock Quantity</label>
                <input
                  type="number"
                  name="stock_quantity"
                  value={formData.stock_quantity}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select Category</option>
                <option value="education">Education</option>
                <option value="health">Health</option>
                <option value="talent">Talent</option>
                <option value="basic">Basic Needs</option>
              </select>
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
                {editingGift ? 'Update Gift' : 'Add Gift'}
              </Button>
              <Button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600 text-white">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {loading && <p>Loading gifts...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Stock</th>
              <th className="border border-gray-300 p-2">Active</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {gifts.map((gift) => (
              <tr key={gift.id} className="text-center">
                <td className="border border-gray-300 p-2">{gift.name}</td>
                <td className="border border-gray-300 p-2 capitalize">{gift.category}</td>
                <td className="border border-gray-300 p-2">${parseFloat(gift.price).toFixed(2)}</td>
                <td className="border border-gray-300 p-2">{gift.stock_quantity}</td>
                <td className="border border-gray-300 p-2">
                  {gift.is_active ? 'Yes' : 'No'}
                </td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <Button onClick={() => handleEdit(gift)} className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(gift.id)} className="bg-red-500 hover:bg-red-600 text-white text-xs">
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
