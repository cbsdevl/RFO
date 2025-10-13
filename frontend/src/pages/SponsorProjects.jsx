import { useState, useEffect } from 'react';
import { FaHeart, FaUsers, FaHandHoldingHeart, FaGift, FaCreditCard, FaPaypal, FaMobile, FaLock, FaCheckCircle, FaInfoCircle, FaDonate, FaCheck, FaTimes, FaExpand, FaEye, FaDollarSign, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

export default function SponsorProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    organization: '',
    sponsorship_amount: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);

  // Fetch sponsor projects from API
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sponsor-projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error('Failed to fetch sponsor projects');
      }
    } catch (error) {
      console.error('Error fetching sponsor projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSponsorClick = (project) => {
    setSelectedProject(project);
    setShowForm(true);
    setFormData({ ...formData, sponsorship_amount: '' });
    setSuccess(false);
    // Scroll to form
    setTimeout(() => {
      document.getElementById('sponsor-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.sponsorship_amount || !formData.full_name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }
    // Record the sponsorship in the backend
    fetch('http://localhost:5000/api/sponsor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        project_id: selectedProject.id
      }),
    }).then(() => {
      // Redirect to payment link
      window.open('https://store.pesapal.com/rfo', '_blank');
    }).catch(err => {
      console.error('Error submitting sponsorship:', err);
      alert('Failed to submit sponsorship. Please try again.');
    });
  };

  const quickAmounts = [100, 500, 1000, 2500];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Sponsor Our Projects
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Choose a project that matters to you and make a real difference in our community. Every contribution helps create lasting change.
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose a Project to Support</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our current projects and see how your sponsorship can help transform lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project) => {
            const moneyRaised = project.current_funding || 0;
            const moneyNeeded = project.funding_goal || 0;
            const progress = parseFloat(project.progress_percentage) || 0;
            const remaining = moneyNeeded - moneyRaised;
            return (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={project.image_url ? `http://localhost:5000${project.image_url}` : '/placeholder-project.jpg'}
                    alt={project.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-project.jpg';
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {project.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{project.name}</h3>
                  <p className="text-gray-600 mb-3">{project.description?.substring(0, 100)}...</p>

                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <FaMapMarkerAlt className="mr-1" />
                    <span>{project.location}</span>
                    <FaUsers className="ml-4 mr-1" />
                    <span>{project.sponsor_count || 0} sponsors</span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold">${moneyRaised.toLocaleString()} raised</span>
                      <span className="text-gray-600">${remaining.toLocaleString()} needed</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 text-center">{progress.toFixed(0)}% funded</p>
                  </div>

                  <button
                    onClick={() => handleSponsorClick(project)}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <FaHeart className="inline mr-2" />
                    Sponsor This Project
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Details and Form */}
        {selectedProject && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={selectedProject.image_url ? `http://localhost:5000${selectedProject.image_url}` : '/placeholder-project.jpg'}
                    alt={selectedProject.name}
                    className="w-full h-64 md:h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-project.jpg';
                    }}
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">{selectedProject.name}</h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-blue-600 mr-3" />
                      <span className="text-gray-700"><strong>Location:</strong> {selectedProject.location}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-blue-600 mr-3" />
                      <span className="text-gray-700"><strong>Duration:</strong> {selectedProject.start_date && selectedProject.end_date ? `${selectedProject.start_date} to ${selectedProject.end_date}` : 'Ongoing'}</span>
                    </div>
                    <div className="flex items-center">
                      <FaUsers className="text-blue-600 mr-3" />
                      <span className="text-gray-700"><strong>Sponsors:</strong> {selectedProject.sponsor_count || 0}</span>
                    </div>
                    <div className="flex items-center">
                      <FaDollarSign className="text-blue-600 mr-3" />
                      <span className="text-gray-700"><strong>Goal:</strong> ${(selectedProject.funding_goal || 0).toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{selectedProject.description}</p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Project Details:</h4>
                    <p className="text-blue-800">Category: {selectedProject.category}</p>
                    <p className="text-blue-800">Current Funding: ${(selectedProject.current_funding || 0).toLocaleString()}</p>
                    <p className="text-blue-800">Progress: {parseFloat(selectedProject.progress_percentage)?.toFixed(0) || 0}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sponsorship Form */}
            {showForm && (
              <div id="sponsor-form" className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Become a Sponsor</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Amount Selection */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-3">
                      How much would you like to sponsor? <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {quickAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setFormData({ ...formData, sponsorship_amount: amt.toString() })}
                          className={`py-3 px-4 rounded-lg border-2 font-bold text-lg transition-all ${
                            formData.sponsorship_amount === amt.toString()
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">$</span>
                      <input
                        type="number"
                        name="sponsorship_amount"
                        value={formData.sponsorship_amount}
                        onChange={handleFormChange}
                        placeholder="Other amount"
                        min="1"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                        required
                      />
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 mb-2">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleFormChange}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="+250 XXX XXX XXX"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 mb-2">
                        Organization/Company (Optional)
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleFormChange}
                        placeholder="Your organization"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows="4"
                      placeholder="Tell us why you're sponsoring this project..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-green-600 text-white py-4 px-12 rounded-lg hover:bg-green-700 transition-colors font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                      Sponsor ${formData.sponsorship_amount || '0'} Now
                    </button>
                    <p className="text-sm text-gray-600 mt-3">
                      Your sponsorship will be processed securely. We'll send you a confirmation email.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <FaCheckCircle className="text-6xl text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Sponsorship!</h2>
              <p className="text-xl text-gray-700 mb-6">
                Your sponsorship of <strong>${formData.sponsorship_amount}</strong> for <strong>{selectedProject.name}</strong> will make a real difference.
                We'll send you updates on the project's progress and impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSuccess(false);
                    setShowForm(false);
                    setSelectedProject(null);
                  }}
                  className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Sponsor Another Project
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-gray-600 text-white py-3 px-8 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                >
                  Back to Top
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
