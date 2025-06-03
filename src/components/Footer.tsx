import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary/10 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="font-bold text-2xl mb-4 inline-block">
              <span className="text-primary">Honey</span> & <span className="text-secondary">Bloom</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Artisanal organic jams and honey, crafted with love using traditional methods and the finest ingredients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-600 hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/products" className="text-gray-600 hover:text-primary transition-colors">Jams</Link></li>
              <li><Link to="/products" className="text-gray-600 hover:text-primary transition-colors">Honey</Link></li>
              <li><Link to="/products" className="text-gray-600 hover:text-primary transition-colors">Featured</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Sustainability</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Shipping</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {year} Honey & Bloom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;