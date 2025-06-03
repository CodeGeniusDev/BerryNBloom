import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Highland Gaba Foods is dedicated to safeguarding your personal information and ensuring that your privacy is protected.
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 leading-relaxed">
                We only collect the personal information that you willingly provide to us. This may include, but is not limited to:
                <ul className="list-disc pl-6 mt-2">
                  <li>Full name</li>
                  <li>Contact number</li>
                  <li>Email address</li>
                  <li>Billing and shipping address</li>
                  <li>Order history and preferences</li>
                  <li>Any communication you have with our customer service team</li>
                </ul>
                We do not collect sensitive personal information unless explicitly required and consented to (e.g., for payment processing).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed">
                Your information is used strictly for business purposes that benefit you as a customer. These include:
                <ul className="list-disc pl-6 mt-2">
                  <li><strong>Processing Orders:</strong> To confirm, process, and deliver your purchases efficiently.</li>
                  <li><strong>Customer Support:</strong> To respond to your queries, requests, or complaints.</li>
                  <li><strong>Marketing & Updates:</strong> To inform you about new products, offers, discounts, and other promotional content (only if you’ve opted in).</li>
                  <li><strong>Personalization:</strong> To enhance your shopping experience based on your preferences and browsing behavior.</li>
                </ul>
                We ensure that your data is only accessed by authorized personnel and used in compliance with applicable privacy laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Security and Protection</h2>
              <p className="text-gray-600 leading-relaxed">
                We take the security of your information seriously. Our platform uses industry-standard security protocols, including:
                <ul className="list-disc pl-6 mt-2">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure server environments</li>
                  <li>Firewalls and access controls to prevent unauthorized access</li>
                </ul>
                We do not share, sell, rent, or trade your personal information with third parties unless legally required or with your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Use of Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                Our website uses cookies and similar tracking technologies to:
                <ul className="list-disc pl-6 mt-2">
                  <li>Remember your preferences (like language or location)</li>
                  <li>Monitor website traffic and usage patterns</li>
                  <li>Provide a more customized and responsive experience</li>
                </ul>
                You can choose to disable cookies via your browser settings; however, this may affect certain website functionalities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Policy Updates</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to update this Privacy Policy periodically to reflect changes in our practices or legal obligations. Any changes will be posted on this page with the updated date. We encourage you to review this page regularly to stay informed.
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

export default PrivacyPolicy;