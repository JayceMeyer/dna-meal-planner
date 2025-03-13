import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="shadow-md">
      <div style={{ backgroundColor: '#0d9488' }} className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center text-white">
            <span className="text-xl font-bold">DNA Meal Planner</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium text-white ${
                isActive('/') ? 'bg-teal-700' : 'hover:bg-teal-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/dna-upload"
              className={`px-3 py-2 rounded-md text-sm font-medium text-white ${
                isActive('/dna-upload') ? 'bg-teal-700' : 'hover:bg-teal-700'
              }`}
            >
              DNA Upload
            </Link>
            <Link
              to="/meal-plan"
              className={`px-3 py-2 rounded-md text-sm font-medium text-white ${
                isActive('/meal-plan') ? 'bg-teal-700' : 'hover:bg-teal-700'
              }`}
            >
              Meal Plan
            </Link>
            <Link
              to="/grocery-list"
              className={`px-3 py-2 rounded-md text-sm font-medium text-white ${
                isActive('/grocery-list') ? 'bg-teal-700' : 'hover:bg-teal-700'
              }`}
            >
              Grocery List
            </Link>
            <Link
              to="/profile"
              className={`px-3 py-2 rounded-md text-sm font-medium text-white ${
                isActive('/profile') ? 'bg-teal-700' : 'hover:bg-teal-700'
              }`}
            >
              Profile
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-teal-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{ backgroundColor: '#0d9488' }} className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium text-white ${
                isActive('/') ? 'bg-teal-700' : 'hover:bg-teal-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/dna-upload"
              className={`block px-3 py-2 rounded-md text-base font-medium text-white ${
                isActive('/dna-upload') ? 'bg-teal-700' : 'hover:bg-teal-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              DNA Upload
            </Link>
            <Link
              to="/meal-plan"
              className={`block px-3 py-2 rounded-md text-base font-medium text-white ${
                isActive('/meal-plan') ? 'bg-teal-700' : 'hover:bg-teal-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Meal Plan
            </Link>
            <Link
              to="/grocery-list"
              className={`block px-3 py-2 rounded-md text-base font-medium text-white ${
                isActive('/grocery-list') ? 'bg-teal-700' : 'hover:bg-teal-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Grocery List
            </Link>
            <Link
              to="/profile"
              className={`block px-3 py-2 rounded-md text-base font-medium text-white ${
                isActive('/profile') ? 'bg-teal-700' : 'hover:bg-teal-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
