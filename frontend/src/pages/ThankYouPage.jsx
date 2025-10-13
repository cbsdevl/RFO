import { useEffect } from 'react';
import { FaCheckCircle, FaCreditCard, FaHeart } from 'react-icons/fa';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function ThankYouPage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handlePayment = () => {
    window.open('https://store.pesapal.com/rfo', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-blue-600 to-green-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative w-full px-4 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl text-white">
            <FaCheckCircle className="text-6xl text-green-300 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Thank You for Your Generosity!
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Your donation has been recorded. Now, complete your contribution by making the payment through our secure payment gateway.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                Complete Your Donation
              </CardTitle>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Your commitment to helping children in need is truly appreciated. Click the button below to proceed with your secure payment through Pesapal.
              </p>
            </CardHeader>

            <CardContent className="text-center space-y-8">
              {/* Payment Button */}
              <div className="space-y-4">
                <Button
                  onClick={handlePayment}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-6 px-12 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-xl"
                  size="lg"
                >
                  <FaCreditCard className="inline mr-3 text-2xl" />
                  Make Payment Now
                </Button>
                <p className="text-sm text-gray-500">
                  Secure payment powered by CBSoft
                </p>
              </div>

              {/* Impact Message */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
                <FaHeart className="text-4xl text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Your Impact Matters
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Every donation, no matter the size, creates ripples of change. Your support provides education, healthcare, and hope to children who need it most. Together, we're building a brighter future for vulnerable children and families.
                </p>
              </div>

              {/* What Happens Next */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle className="text-2xl text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Payment Processed</h4>
                  <p className="text-sm text-gray-600">Your secure payment is processed instantly</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaHeart className="text-2xl text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Funds Allocated</h4>
                  <p className="text-sm text-gray-600">Your donation goes directly to help children</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle className="text-2xl text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Impact Created</h4>
                  <p className="text-sm text-gray-600">Lives are changed through your generosity</p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-8 border-t border-gray-200">
                <p className="text-gray-600 mb-6">
                  Want to make another donation or learn more about our programs?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/donation"
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Make Another Child Donation
                  </a>
                  <a
                    href="/gifts"
                    className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Make Another Gift Donation
                  </a>
                  <a
                    href="/about"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    Learn About Our Work
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
