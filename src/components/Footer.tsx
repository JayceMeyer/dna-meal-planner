const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{ backgroundColor: '#0d9488' }} className="text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-white">DNA Meal Planner</h3>
            <p className="text-sm mt-1 text-white">Personalized nutrition based on your genetics</p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="mb-4 md:mb-0">
              <h4 className="font-semibold mb-2 text-white">Quick Links</h4>
              <ul className="text-sm text-white">
                <li className="mb-1"><a href="/" className="text-white hover:underline">Home</a></li>
                <li className="mb-1"><a href="/dna-upload" className="text-white hover:underline">DNA Upload</a></li>
                <li className="mb-1"><a href="/meal-plan" className="text-white hover:underline">Meal Plan</a></li>
                <li className="mb-1"><a href="/grocery-list" className="text-white hover:underline">Grocery List</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 text-white">Contact</h4>
              <ul className="text-sm text-white">
                <li className="mb-1 text-white">Email: info@dnamealplanner.com</li>
                <li className="mb-1 text-white">Phone: (555) 123-4567</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-teal-500 mt-6 pt-6 text-center text-sm text-white">
          <p className="text-white">&copy; {currentYear} DNA Meal Planner. All rights reserved.</p>
          <p className="mt-1 text-white">
            <a href="/privacy" className="text-white hover:underline mr-4">Privacy Policy</a>
            <a href="/terms" className="text-white hover:underline">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
