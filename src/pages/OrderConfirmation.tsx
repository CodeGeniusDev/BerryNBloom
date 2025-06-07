import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const { orderId, orderNumber } = location.state || {};

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
          
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          
          <p className="text-gray-600 mb-6">
            Thank you for your order! We've received your order and will begin processing it shortly. 
            You'll receive a confirmation email with your order details.
          </p>
          
          <div className="bg-gray-50 rounded-md p-6 mb-8">
            <h2 className="font-semibold mb-4">Order Information</h2>
            
            <div className="space-y-2">
              {orderNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-medium">{orderNumber}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-yellow-600">Pending</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <Package className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
              <div className="text-left">
                <h3 className="font-medium text-blue-900 mb-1">What's Next?</h3>
                <p className="text-blue-700 text-sm">
                  We'll send you tracking information once your order ships. 
                  You can also check your order status anytime in your account.
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-8">
            If you have any questions about your order, please don't hesitate to{' '}
            <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/orders" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              View Order History
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;