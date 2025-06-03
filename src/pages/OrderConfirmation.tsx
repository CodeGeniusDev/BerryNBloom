import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderConfirmation: React.FC = () => {
  return (
    <div className="pt-32 pb-16">
      <div className="container-custom max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-8"
        >
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
          
          <p className="text-gray-600 mb-6">
            Your order has been received and is being processed. We've sent a confirmation email to your inbox with your order details.
          </p>
          
          <div className="bg-gray-50 rounded-md p-6 mb-8">
            <h2 className="font-semibold mb-4">Order Information</h2>
            
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">ORD-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-8">
            If you have any questions about your order, please don't hesitate to <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary">
              Return to Home
            </Link>
            
            <Link to="/products" className="btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;