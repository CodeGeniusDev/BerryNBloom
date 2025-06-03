import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, MapPin, Phone, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

const sendFormData = async (data: ContactFormData, isDistributor: boolean): Promise<EmailResponse> => {
  const endpoint = isDistributor ? '/api/distributor' : '/api/contact';
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending form data:', error);
    throw error;
  }
};

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formType, setFormType] = useState<'contact' | 'distributor'>('contact');
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();
  
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await sendFormData(data, formType === 'distributor');
      
      if (response.success) {
        setSubmitSuccess(true);
        reset();
      } else {
        throw new Error(response.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending form:', error);
      setSubmitError(error instanceof Error ? error.message : 'There was an error sending your message. Please try again later.');
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="pt-28 pb-20 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're here to answer your questions, discuss potential partnerships, or help with your orders. 
            Reach out to us or explore becoming a distributor.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
              <div className="flex mb-8 space-x-4">
                <button
                  onClick={() => setFormType('contact')}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    formType === 'contact'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Contact Us
                </button>
                <button
                  onClick={() => setFormType('distributor')}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    formType === 'distributor'
                      ? 'bg-secondary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Become a Distributor
                </button>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {formType === 'contact' ? 'Send Us a Message' : 'Distributor Application'}
              </h2>
              
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-6 mb-6">
                  <p className="font-medium">Error</p>
                  <p>{submitError}</p>
                </div>
              )}
              {submitSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-6 mb-6">
                  <p className="font-medium">Thank you for your submission!</p>
                  <p>
                    {formType === 'contact'
                      ? 'Your contact form has been submitted successfully. We will respond promptly.'
                      : 'Your distributor application has been submitted successfully. We will review and get back to you soon.'}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                        Your Name*
                      </label>
                      <input
                        id="name"
                        type="text"
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register('name', { required: true })}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-2">Name is required</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                        Your Email*
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register('email', { 
                          required: true, 
                          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
                        })}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-2">Valid email is required</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="subject">
                      {formType === 'contact' ? 'Subject*' : 'Business Name*'}
                    </label>
                    <input
                      id="subject"
                      type="text"
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                      {...register('subject', { required: true })}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-2">
                        {formType === 'contact' ? 'Subject is required' : 'Business name is required'}
                      </p>
                    )}
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">
                      {formType === 'contact' ? 'Your Message*' : 'Tell Us About Your Business*'}
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      {...register('message', { required: true })}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-2">
                        {formType === 'contact' ? 'Message is required' : 'Business details are required'}
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto px-8 py-3 rounded-lg font-medium text-white ${
                      formType === 'contact' ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/90'
                    } transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Submitting...' : formType === 'contact' ? 'Send Message' : 'Submit Application'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-8">Contact Information</h2>
              
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
                      info@honeyandbloom.com <br />
                      distributors@honeyandbloom.com
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

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Become a Distributor</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Join our network of trusted partners and bring our premium products to your market.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary/90 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary/90 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary/90 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <div className="rounded-2xl overflow-hidden h-96 shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086058149418!2d-122.41941568468116!3d37.77492977975966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c5e5a2b67%3A0x3e1a4e6b8e8b8c8!2s123%20Orchard%20Ln%2C%20San%20Francisco%2C%20CA%2090210%2C%20USA!5e0!3m2!1sen!2sus!4v1697051234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;