import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          <div className="md:col-span-1">
              {/* <img
                src="../../favicon.ico"
                alt="Berry Bloom"
                className="w-12 h-12"
              /> */}
            <Link to="/" className="font-bold text-2xl mb-4 inline-block">
              <span className="text-primary">Berry</span> &{" "}
              <span className="text-secondary">Bloom</span>
            </Link>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              Artisanal organic jams and honey, crafted with love using
              traditional methods and the finest ingredients.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 hover:text-secondary transition-colors text-sm"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 hover:text-secondary transition-colors text-sm"
                >
                  Jams
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 hover:text-secondary transition-colors text-sm"
                >
                  Honey
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 hover:text-secondary transition-colors text-sm"
                >
                  Featured
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-secondary transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-secondary transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 hover:text-secondary transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-gray-600 hover:text-secondary transition-colors text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="text-gray-600 hover:text-secondary transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-600 hover:text-secondary transition-colors text-sm"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-gray-600 hover:text-secondary transition-colors text-sm"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-secondary transition-colors text-sm"
                >
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500 text-sm"
        >
          <p>© {year} 
            <Link
            to="/" >
            Honey & Bloom. 
            </Link>
            All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
