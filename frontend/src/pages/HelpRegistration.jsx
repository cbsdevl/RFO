import { useState } from 'react';

export default function HelpRegistration() {
  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    gender: 'Male',
    phone: '',
    email: '',
    location: '',
    needs: [],  // Array for selected programs
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const programs = [
    { id: 'talent', label: 'Talent Empowerment', description: 'Develop skills and leadership' },
    { id: 'health', label: 'Health Support', description: 'Medical care, nutrition, and wellness' },
    { id: 'education', label: 'Education Assistance', description: 'School supplies, scholarships, and tutoring' },
    { id: 'employment', label: 'Employment Training', description: 'Job skills and career coaching' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNeedsChange = (needId) => {
    setFormData(prev => ({
      ...prev,
      needs: prev.needs.includes(needId)
        ? prev.needs.filter(id => id !== needId)
        : [...prev.needs, needId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name.trim() || !formData.phone.trim() || !formData.location.trim() || formData.needs.length === 0) {
      setSubmitMessage('Please fill required fields and select at least one need.');
      return;
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setSubmitMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      const res = await fetch('/api/register-help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Submission failed');
      const data = await res.json();
      setSubmitMessage(data.message || 'Success!');
      setFormData({ full_name: '', age: '', gender: 'Male', phone: '', email: '', location: '', needs: [], message: '' });
    } catch (err) {
      console.error(err);
      setSubmitMessage('Error submitting request. Please try again or call +250788854883.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register for Help</h1>
          <p className="text-center text-gray-600 mb-8">
            If you or your family are facing challenges with health, education, employment, or talent development, 
            we're here to support you. Fill out this form, and our team will reach out within 48 hours.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your full name"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 25"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+250 788 854 883"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location (Sector/District) *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Rilima Sector, Bugesera District"
                required
                aria-required="true"
              />
            </div>

            {/* Needs Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">What support do you need? * (Select at least one)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {programs.map((program) => (
                  <label key={program.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.needs.includes(program.id)}
                      onChange={() => handleNeedsChange(program.id)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                      aria-describedby={`${program.id}-desc`}
                    />
                    <div>
                      <span className="font-medium text-gray-700">{program.label}</span>
                      <p id={`${program.id}-desc`} className="text-sm text-gray-500 mt-1">{program.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us more about your situation..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label="Submit help registration form"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>

          {submitMessage && (
            <div className={`mt-6 p-4 rounded-lg text-center ${
              submitMessage.includes('Success') || submitMessage.includes('submitted')
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}>
              {submitMessage}
            </div>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Need Immediate Help?</h2>
          <p className="text-gray-700 mb-4">Call our hotline or visit our office:</p>
          <ul className="space-y-2 text-gray-600">
            <li><strong>Phone:</strong> +250 788 854 883</li>
            <li><strong>Email:</strong> risefamilyorganization@gmail.com</li>
            <li><strong>Address:</strong> Rilima Sector, Bugesera District, Eastern Province, Rwanda</li>
          </ul>
        </div>
      </div>
    </div>
  );
}