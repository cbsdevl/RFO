import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { FaHeart, FaUsers, FaHandHoldingHeart, FaGift, FaCreditCard, FaPaypal, FaMobile, FaLock, FaCheckCircle, FaInfoCircle, FaDonate, FaCheck, FaTimes, FaExpand } from 'react-icons/fa';

export default function DonationPage() {
  const location = useLocation();
  const gift = location.state?.gift; // Get gift from navigation state

  const [step, setStep] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(null); // Store success data
  const [selectedImage, setSelectedImage] = useState(null); // For full image modal

  const [amount, setAmount] = useState(gift ? gift.price.toString() : '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [childNeeds, setChildNeeds] = useState([]);
  const [selectedChildNeed, setSelectedChildNeed] = useState(null);


  // Fetch child needs on component mount
  useEffect(() => {
    fetch('http://localhost:5000/api/child-needs')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch child needs');
        return res.json();
      })
      .then(data => setChildNeeds(data))
      .catch(err => console.error('Error fetching child needs:', err));
  }, []);


  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const quickAmounts = [5, 25, 50, 100, 250];

  // Validation per step
  const validateStep = () => {
    setError('');
    if (step === 1) {
      if (!amount || parseFloat(amount) <= 0) {
        setError('Please enter a valid donation amount.');
        return false;
      }
    } else if (step === 2) {
      if (!name.trim()) {
        setError('We need your name to send a thank-you note!');
        return false;
      }
      if (!email.trim() || !email.includes('@')) {
        setError('Please enter a valid email address.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
      setError('');
    }
  };

  const handleBack = () => {
    setError('');
    setStep(step - 1);
  };

  const handleDonateNow = (child) => {
    setSelectedChildNeed(child);
    setShowForm(true);
    setStep(1);
    setAmount('');
    setName('');
    setEmail('');
    setError('');
    setSuccess('');
    setDonationSuccess(null);
    // Scroll to form
    setTimeout(() => {
      document.getElementById('donation-form').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleImageClick = (imageUrl, childName) => {
    setSelectedImage({ url: imageUrl, name: childName });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleDonate = () => {
    if (!validateStep()) return;
    const body = {
      amount: parseFloat(amount),
      donor_name: name,
      email
    };

    // Add gift information if donating a gift
    if (gift) {
      body.gift_id = gift.id;
      body.gift_name = gift.name;
      body.gift_category = gift.category;
    }

    if (selectedChildNeed) {
      body.child_need_id = selectedChildNeed.id;
    }
    fetch('http://localhost:5000/api/donate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(() => {
      window.location.href = '/thank-you';
    }).catch(err => {
      console.error('Donation error:', err);
      setError('Unable to process donation. Please check your connection and try again.');
    });
  };

  const impactStats = [
    { icon: FaUsers, number: '1000+', label: 'Children Helped', color: 'text-blue-600' },
    { icon: FaHeart, number: '500+', label: 'Families Supported', color: 'text-red-600' },
    { icon: FaHandHoldingHeart, number: '$50K+', label: 'Funds Raised', color: 'text-green-600' },
    { icon: FaGift, number: '200+', label: 'Donations Made', color: 'text-purple-600' }
  ];

  // Progress bar percentage
  const progressPercent = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeImageModal}>
          <div className="relative w-full max-w-4xl max-h-full">
            <img
              src={`http://localhost:5000${selectedImage.url}`}
              alt={`Full view of ${selectedImage.name}`}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeImageModal();
              }}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity"
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-[50vh] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative w-full px-4 h-full flex items-center">
          <div className="max-w-4xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {gift ? `Donate ${gift.name}` : 'Make a Difference Today'}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              {gift
                ? `Support a child with this ${gift.category} gift. ${gift.impact}`
                : 'Your generosity can change lives. Support children and families in need with your donation.'
              }
            </p>
            {gift && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-6">
                <div className="flex items-center space-x-4">
                  <FaGift className="text-3xl text-yellow-300" />
                  <div>
                    <h3 className="text-xl font-semibold">{gift.name}</h3>
                    <p className="text-blue-100">{gift.description}</p>
                    <p className="text-yellow-300 font-bold text-lg">${gift.price}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-white py-16">
        <div className="w-full px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className={`text-4xl ${stat.color} mx-auto mb-4`} />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Donation Success Message */}
      {donationSuccess && (
        <div className="w-full px-4 py-16">
          <Card className="w-full shadow-lg bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-8 text-center">
              <FaCheck className="text-6xl text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Generous Donation!</h2>
              <p className="text-xl text-gray-700 mb-6">{donationSuccess.message}</p>
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="text-center">
                  <img
                    src={`http://localhost:5000${donationSuccess.child.image_url}`}
                    alt={`Photo of ${donationSuccess.child.name}`}
                    className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">{donationSuccess.child.name}</h3>
                  <p className="text-gray-600">{donationSuccess.child.age} years old • {donationSuccess.child.location}</p>
                </div>
                <div className="text-left md:text-center">
                  <p className="text-lg text-gray-700 mb-2">Your donation of <span className="font-bold text-green-600">${donationSuccess.amount}</span> will help {donationSuccess.child.name} with:</p>
                  <p className="text-gray-600">{donationSuccess.child.problem}</p>
                  <p className="text-sm text-gray-500 mt-2">We'll send a receipt to your email.</p>
                </div>
              </div>
              <Button
                onClick={() => setDonationSuccess(null)}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Make Another Donation
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Children Who Need Help */}
      <div className="w-full px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Children Who Need Your Help</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the children waiting for your support. Click "Donate Now" to make a direct impact on their lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {childNeeds.map((child) => {
            const childProgress = child.money_needed > 0 ? ((child.donated_amount / child.money_needed) * 100).toFixed(1) : 0;
            const remaining = child.money_needed - child.donated_amount;
            return (
              <Card key={child.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <img
                      src={`http://localhost:5000${child.image_url}`}
                      alt={`Photo of ${child.name}`}
                      className="w-24 h-24 object-cover rounded-full mx-auto mb-4 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleImageClick(child.image_url, child.name)}
                    />
                    <h3 className="text-xl font-semibold text-gray-900">{child.name}</h3>
                    <p className="text-gray-600">{child.age} years old • {child.location}</p>
                  </div>
                  <p className="text-gray-700 mb-4 text-center">{child.problem}</p>
                  <div className="mb-4">
                    <div className="w-full bg-gray-300 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(childProgress, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 text-center">{childProgress}% funded • ${remaining.toLocaleString()} still needed</p>
                  </div>
                  <Button
                    onClick={() => handleDonateNow(child)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    aria-label={`Donate to ${child.name}`}
                  >
                    <FaDonate className="inline mr-2" />
                    Donate Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {childNeeds.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <FaUsers className="text-6xl mx-auto mb-4 text-gray-300" />
            <p className="text-xl">No specific child needs available at the moment.</p>
            <p className="text-lg mt-2">Your donation will support our general programs.</p>
          </div>
        )}

        {/* Donation Form */}
        {showForm && selectedChildNeed && (
          <div id="donation-form" className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl mb-2">
                  Donate to {selectedChildNeed.name}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  You're donating to {selectedChildNeed.name}, {selectedChildNeed.age} years old from {selectedChildNeed.location}.
                </CardDescription>
              </CardHeader>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                  aria-label={`Step ${step} of 3`}
                />
              </div>

              <CardContent className="pt-0">
                {/* Step 1: Choose Amount */}
                {step === 1 && (
                  <>
                    {!gift && (
                      <div className="mb-6">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">
                          How much would you like to donate? <FaInfoCircle className="inline text-blue-500" title="Choose a quick amount or enter a custom amount" />
                        </Label>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {quickAmounts.map((amt) => (
                            <button
                              key={amt}
                              onClick={() => setAmount(amt.toString())}
                              className={`py-2 px-4 rounded-lg border transition-colors ${
                                amount === amt.toString()
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                              }`}
                              aria-pressed={amount === amt.toString()}
                            >
                              ${amt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <Label htmlFor="amount">
                        {gift ? 'Gift Amount' : 'Donation Amount'}
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={gift ? `$${gift.price}` : "Enter amount in USD"}
                        min="1"
                        className="mt-1"
                        disabled={!!gift} // Disable amount input for gift donations
                        aria-describedby="amountHelp"
                      />
                      {gift && (
                        <p id="amountHelp" className="text-sm text-gray-500 mt-1">
                          This amount is fixed for the selected gift
                        </p>
                      )}
                    </div>

                    <Button
                      variant="default"
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      onClick={handleNext}
                      aria-label="Next: Your Details"
                    >
                      Next: Your Details
                    </Button>
                  </>
                )}

                {/* Step 2: Your Details */}
                {step === 2 && (
                  <>
                    <div className="mb-4">
                      <Label htmlFor="name">Your Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="mt-1"
                        aria-describedby="nameHelp"
                      />
                      <p id="nameHelp" className="text-sm text-gray-500 mt-1">
                        We need your name to send a thank-you note.
                      </p>
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="email">Your Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="mt-1"
                        aria-describedby="emailHelp"
                      />
                      <p id="emailHelp" className="text-sm text-gray-500 mt-1">
                        We'll send your donation receipt here.
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={handleBack} aria-label="Back to Choose Amount">
                        Back
                      </Button>
                      <Button variant="default" onClick={handleNext} aria-label="Next: Review & Donate">
                        Next: Review & Donate
                      </Button>
                    </div>
                  </>
                )}

                {/* Step 3: Review & Donate */}
                {step === 3 && (
                  <>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Review Your Donation</h3>
                      <ul className="text-gray-700 space-y-1">
                        <li><FaCheckCircle className="inline text-green-600 mr-2" /> Amount: ${amount}</li>
                        <li><FaCheckCircle className="inline text-green-600 mr-2" /> Name: {name}</li>
                        <li><FaCheckCircle className="inline text-green-600 mr-2" /> Email: {email}</li>
                        <li><FaCheckCircle className="inline text-green-600 mr-2" /> Child: {selectedChildNeed.name}</li>
                      </ul>
                    </div>

                    {error && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                      </div>
                    )}
                    {success && (
                      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                        {success}
                      </div>
                    )}

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={handleBack} aria-label="Back to Your Details">
                        Back to Your Details
                      </Button>
                      <Button
                        variant="default"
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        onClick={handleDonate}
                        aria-label="Submit Donation"
                      >
                        Donate to {selectedChildNeed.name}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="w-full px-4 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Every Dollar Makes a Difference
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of donors who are transforming lives. Your support provides education, healthcare, and hope to children in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/support" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Other Ways to Help
            </a>
            <a href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
