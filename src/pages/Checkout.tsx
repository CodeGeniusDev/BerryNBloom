import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import { sendOrderEmail } from '../utils/emailService';
import { motion } from 'framer-motion';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
}

const Checkout: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>();
  
  if (cart.length === 0) {
    navigate('/products');
    return null;
  }
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;
  
  const onSubmit = async (data: CheckoutFormData) => {
    // Combine form data with cart items
    const orderData = {
      customer: data,
      orderItems: cart,
      orderTotal: total,
      orderDate: new Date().toISOString()
    };
    
    try {
      await sendOrderEmail(orderData);
      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error processing your order. Please try again.');
    }
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2"
            >
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label" htmlFor="firstName">First Name*</label>
                    <input
                      id="firstName"
                      type="text"
                      className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                      {...register('firstName', { required: true })}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">First name is required</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="form-label" htmlFor="lastName">Last Name*</label>
                    <input
                      id="lastName"
                      type="text"
                      className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                      {...register('lastName', { required: true })}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">Last name is required</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="form-label" htmlFor="email">Email*</label>
                    <input
                      id="email"
                      type="email"
                      className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                      {...register('email', { 
                        required: true, 
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">Valid email is required</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="form-label" htmlFor="phone">Phone Number*</label>
                    <input
                      id="phone"
                      type="tel"
                      className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                      {...register('phone', { required: true })}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">Phone number is required</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="form-label" htmlFor="address">Address*</label>
                  <input
                    id="address"
                    type="text"
                    className={`form-input ${errors.address ? 'border-red-500' : ''}`}
                    {...register('address', { required: true })}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">Address is required</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="form-label" htmlFor="city">City*</label>
                    <input
                      id="city"
                      type="text"
                      className={`form-input ${errors.city ? 'border-red-500' : ''}`}
                      {...register('city', { required: true })}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">City is required</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="form-label" htmlFor="state">State*</label>
                    <input
                      id="state"
                      type="text"
                      className={`form-input ${errors.state ? 'border-red-500' : ''}`}
                      {...register('state', { required: true })}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-xs mt-1">State is required</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="form-label" htmlFor="zip">ZIP Code*</label>
                    <input
                      id="zip"
                      type="text"
                      className={`form-input ${errors.zip ? 'border-red-500' : ''}`}
                      {...register('zip', { required: true })}
                    />
                    {errors.zip && (
                      <p className="text-red-500 text-xs mt-1">ZIP code is required</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Order Notes</h2>
                
                <div>
                  <label className="form-label" htmlFor="notes">Special Instructions</label>
                  <textarea
                    id="notes"
                    rows={4}
                    className="form-input"
                    placeholder="Add any special instructions or notes about your order here..."
                    {...register('notes')}
                  ></textarea>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="max-h-64 overflow-y-auto mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex py-2 border-b border-gray-100">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  {shipping > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      Free shipping on orders over $50
                    </div>
                  )}
                  
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white rounded-md font-semibold hover:bg-primary/90 transition-colors"
                >
                  Place Order
                </button>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;