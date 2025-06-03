import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to Highland Gaba Foods. By accessing or using our website, you agree to comply with and be bound by the following Terms and Conditions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
        >
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Website Use</h2>
              <p className="text-gray-600 leading-relaxed">
                By browsing, accessing, or placing an order through our website, you acknowledge that you have read, understood, and agree to be legally bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Product Availability</h2>
              <p className="text-gray-600 leading-relaxed">
                All products listed on our website are subject to availability. We make every effort to ensure the accuracy of our inventory, but in rare cases:
                <ul className="list-disc pl-6 mt-2">
                  <li>A product may be out of stock or discontinued without notice</li>
                  <li>We reserve the right to limit the quantity of any product sold</li>
                  <li>We may substitute or modify products to meet demand, with prior notice where possible</li>
                </ul>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Pricing</h2>
              <p className="text-gray-600 leading-relaxed">
                We strive to maintain accurate and up-to-date pricing on all items. However:
                <ul className="list-disc pl-6 mt-2">
                  <li>Prices may change at any time without prior notice</li>
                  <li>Any errors in pricing or product descriptions will be corrected as soon as they are identified</li>
                  <li>We reserve the right to cancel orders in the event of pricing errors</li>
                </ul>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payments</h2>
              <p className="text-gray-600 leading-relaxed">
                We accept a variety of secure and convenient payment methods, including:
                <ul className="list-disc pl-6 mt-2">
                  <li>Bank Transfer</li>
                  <li>Cash on Delivery (COD)</li>
                  <li>Secure Online Gateways (e.g., debit/credit cards, third-party providers)</li>
                </ul>
                All payments must be completed in full before the delivery of goods unless agreed otherwise.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. User Responsibility</h2>
              <p className="text-gray-600 leading-relaxed">
                Customers are responsible for providing complete, accurate, and up-to-date personal and delivery information when placing orders. Highland Gaba Foods is not liable for issues arising from incorrect details, such as:
                <ul className="list-disc pl-6 mt-2">
                  <li>Missed deliveries</li>
                  <li>Communication errors</li>
                  <li>Order delays</li>
                </ul>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed">
                All content featured on this website—including, but not limited to, logos, product images, brand assets, graphics, text, and design—is the exclusive property of Highland Gaba Foods. Unauthorized use, reproduction, distribution, or modification of any content without written permission is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms and Conditions shall be governed by and interpreted in accordance with the laws of the Islamic Republic of Pakistan. Any disputes arising from or relating to these terms shall be subject to the exclusive jurisdiction of the courts of Pakistan.
              </p>
            </section>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-8">Contact Us</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Our Location</h3>
                  <p className="text-gray-600 leading-relaxed">
                    123 Orchard Lane, <br />
                    Meadowville, CA 90210, USA
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600 leading-relaxed">
                    <a href="mailto:support@highlandgabafoods.com" className="text-secondary hover:underline">
                      support@highlandgabafoods.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                  <p className="text-gray-600 leading-relaxed">
                    +1 (555) 123-4567 <br />
                    Monday-Friday, 9:00 AM - 5:00 PM PST
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;