export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img
              src="/logo.png"
              alt="RFO Logo"
              className="w-32 h-32 mx-auto md:mx-0 mb-4 rounded-full"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/128x128?text=RFO'; }}
            />
            <p className="text-center md:text-left">Rise Family Organization - Empowering Futures</p>
          </div>
          <div className="text-center md:text-right space-y-2">
            <p><strong>Address:</strong> Eastern Province, Bugesera District, Rilima Sector, Rwanda</p>
            <p><strong>Phone:</strong> +250788854883</p>
            <p><strong>Email:</strong> risefamilyorganization@gmail.com</p>
            <p><strong>Established:</strong> 2022 | <strong>Founder:</strong> SIBOMANA VIATEUR</p>
          </div>
        </div>
        <div className="border-t border-blue-700 mt-8 pt-4 text-center">
          <p>&copy; 2025 Rise Family Organization. Designed|Developed by CBS.</p>
        </div>
      </div>
    </footer>
  );
}