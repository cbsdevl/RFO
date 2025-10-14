import { useState } from 'react';

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    skills: [],  // Array for selected skills
    availability: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const skillOptions = [
    { id: 'teaching', label: 'Teaching & Education', description: 'Help with tutoring, workshops, or educational programs' },
    { id: 'medical', label: 'Medical & Health', description: 'Healthcare support, first aid, or wellness programs' },
    { id: 'administrative', label: 'Administrative', description: 'Office work, data entry, or organizational support' },
    { id: 'fundraising', label: 'Fundraising', description: 'Event planning, donor outreach, or campaign management' },
    { id: 'community', label: 'Community Outreach', description: 'Public relations, social media, or community engagement' },
    { id: 'technical', label: 'Technical Support', description: 'IT help, website maintenance, or digital tools' }
  ];

  const availabilityOptions = [
    'Weekdays (morning)',
    'Weekdays (afternoon)',
    'Weekdays (evening)',
    'Weekends (morning)',
    'Weekends (afternoon)',
    'Weekends (evening)',
    'Flexible schedule',
    'One-time events only'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (skillId) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter(id => id !== skillId)
        : [...prev.skills, skillId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name.trim() || !formData.email.trim() || !formData.phone.trim() || formData.skills.length === 0 || !formData.availability) {
      setSubmitMessage('Please fill all required fields and select at least one skill.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setSubmitMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Submission failed');
      const data = await res.json();
      setSubmitMessage(data.message || 'Success!');
      setFormData({ full_name: '', email: '', phone: '', skills: [], availability: '', message: '' });
    } catch (err) {
      console.error(err);
      setSubmitMessage('Error submitting application. Please try again or call +250788854883.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Become a Volunteer</h1>
          <p className="text-center text-gray-600 mb-8">
            Join our mission to uplift families and communities in Rwanda. Your time and skills can make a real difference.
            Fill out this form, and we'll get back to you within 48 hours to discuss opportunities.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
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

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                  required
                  aria-required="true"
                />
              </div>
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
            </div>

            {/* Skills Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">What skills can you offer? * (Select at least one)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {skillOptions.map((skill) => (
                  <label key={skill.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill.id)}
                      onChange={() => handleSkillsChange(skill.id)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                      aria-describedby={`${skill.id}-desc`}
                    />
                    <div>
                      <span className="font-medium text-gray-700">{skill.label}</span>
                      <p id={`${skill.id}-desc`} className="text-sm text-gray-500 mt-1">{skill.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">Availability *</label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                aria-required="true"
              >
                <option value="">Select your availability</option>
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
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
                placeholder="Tell us about your experience, motivation, or any specific areas you'd like to help with..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label="Submit volunteer application form"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>

          {submitMessage && (
            <div className={`mt-6 p-4 rounded-lg text-center ${
              submitMessage.includes('submitted') || submitMessage.includes('Success')
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}>
              {submitMessage}
            </div>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Questions?</h2>
          <p className="text-gray-700 mb-4">Contact us to learn more about volunteer opportunities:</p>
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
