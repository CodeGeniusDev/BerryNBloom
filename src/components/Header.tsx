import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount } = useCart();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="font-bold text-2xl">
          <span className="text-primary">Berry</span> & <span className="text-secondary">Bloom</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavLink to="/" label="Home" />
          <NavLink to="/products" label="Shop" />
          <NavLink to="/about" label="About" />
          <NavLink to="/our-story" label="Our Story" />
          <NavLink to="/careers" label="Careers" />
          <NavLink to="/contact" label="Contact" />
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <ShoppingBag className="w-6 h-6" />
            {getCartCount() > 0 && (
              <motion.span 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {getCartCount()}
              </motion.span>
            )}
          </Link>

          {/* Profile Icon and Menu */}
          <div className="relative">
            {user ? (
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <User className="w-5 h-5 text-primary" />
              </button>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Sign In
              </Link>
            )}

            <AnimatePresence>
              {isProfileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-medium truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Order History
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-md absolute w-full"
        >
          <nav className="flex flex-col py-4">
            <MobileNavLink to="/" label="Home" />
            <MobileNavLink to="/products" label="Shop" />
            <MobileNavLink to="/about" label="About" />
            <MobileNavLink to="/our-story" label="Our Story" />
            <MobileNavLink to="/careers" label="Careers" />
            <MobileNavLink to="/contact" label="Contact" />
            {user && <MobileNavLink to="/orders\" label="Order History" />}
            {user ? (
              <button
                onClick={handleSignOut}
                className="py-3 px-6 text-left font-medium text-red-600 hover:bg-gray-50"
              >
                Sign Out
              </button>
            ) : (
              <MobileNavLink to="/login" label="Sign In" />
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to === '/products' && location.pathname.startsWith('/products'));

  return (
    <Link 
      to={to} 
      className={`font-medium transition-all hover:text-primary relative ${
        isActive ? 'text-primary' : ''
      }`}
    >
      {label}
      {isActive && (
        <motion.div 
          layoutId="underline"
          className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary"
        />
      )}
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to === '/products' && location.pathname.startsWith('/products'));

  return (
    <Link 
      to={to} 
      className={`py-3 px-6 font-medium transition-all ${
        isActive ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50'
      }`}
    >
      {label}
    </Link>
  );
};

export default Header;