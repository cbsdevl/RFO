import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function DonationAppeal() {
  const [amount, setAmount] = useState('');
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDonate = async () => {
    if (!amount || !name || !email) {
      setError('Please fill in all required fields.');
      return;
    }
    if (parseFloat(amount) <= 0) {
      setError('Please enter a valid donation amount.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    try {
      const body = { amount: parseFloat(amount), donor_name: name, email };
      if (selectedChildNeed) {
        body.child_need_id = selectedChildNeed.id;
      }
      const res = await fetch('http://localhost:5000/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to submit donation');
      const data = await res.json();
      setSuccess(data.message || 'Donation successful! Thank you for your generosity.');
      // Reset form
      setAmount('');
      setName('');
      setEmail('');
      setSelectedChildNeed(null);
      // Refresh child needs
      fetch('http://localhost:5000/api/child-needs')
        .then(res => res.json())
        .then(data => setChildNeeds(data))
        .catch(err => console.error('Error refreshing child needs:', err));
    } catch (err) {
      console.error('Donation error:', err);
      setError('Unable to process donation. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="donation"
      className="py-16 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 animate-gradient-x"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-6 text-gray-900">Support a Child Today</h2>
        <p className="text-lg mb-10 text-gray-700 max-w-3xl mx-auto">
          Suggested: $5 (monthly support), $60 (yearly), or any amount to empower families.
        </p>

        {/* Child Needs Cards */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {childNeeds.map((child) => {
            const childProgress = child.money_needed > 0 ? ((child.donated_amount / child.money_needed) * 100).toFixed(1) : 0;
            const remaining = child.money_needed - child.donated_amount;
            const isSelected = selectedChildNeed && selectedChildNeed.id === child.id;
            return (
              <Card
                key={child.id}
                onClick={() => setSelectedChildNeed(child)}
                className={`max-w-xs cursor-pointer border-4 transition-shadow duration-300 ${
                  isSelected ? 'border-blue-600 shadow-lg shadow-blue-400/50 animate-float' : 'border-transparent hover:shadow-md hover:shadow-blue-300/40'
                }`}
              >
                <img
                  src={`http://localhost:5000${child.image_url}`}
                  alt={`Child need ${child.id}`}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardContent className="text-left">
                  <CardTitle className="text-xl mb-2">{child.problem}</CardTitle>
                  <CardDescription>
                    <p><strong>Name:</strong> {child.name}</p>
                    <p><strong>Age:</strong> {child.age}</p>
                    <p><strong>Location:</strong> {child.location}</p>
                    <p><strong>Money Needed:</strong> ${child.money_needed.toLocaleString()}</p>
                    <p><strong>Donated:</strong> ${child.donated_amount.toLocaleString()}</p>
                    <p><strong>Still Needed:</strong> ${remaining.toLocaleString()}</p>
                  </CardDescription>
                  <div className="mt-4">
                    <div className="w-full bg-gray-300 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(childProgress, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{childProgress}% funded</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Donation Form */}
        <Card className="max-w-lg mx-auto p-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl mb-2">Make a Donation</CardTitle>
            <CardDescription className="text-gray-600">
              Fill in your details and support a child in need.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mb-4">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-1"
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g., 5 or 60"
                min="1"
                className="mt-1"
              />
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
            <Button
              variant="default"
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={handleDonate}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Donate Now'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
