import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder, ShippingAddress } from '../lib/orderService';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface CheckoutFormData extends ShippingAddress {}

const Checkout: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>();
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  if (cart.length === 0) {
    navigate('/products');
    return null;
  }
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;
  
  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const orderItems = cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const order = await createOrder({
        total,
        shipping_address: data,
        items: orderItems
      });

      // Clear cart after successful order creation
      await clearCart();
      
      // Navigate to order confirmation with order ID
      navigate('/order-confirmation', { 
        state: { 
          orderId: order.id,
          orderNumber: order.id.slice(0, 8).toUpperCase()
        } 
      });
    } catch (error) {
      console.error('Error creating order:', error);
      setError(error instanceof Error ? error.message : 'Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}
        
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
                      {...register('firstName', { required: 'First name is required' })}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="form-label" htmlFor="lastName">Last Name*</label>
                    <input
                      id="lastName"
                      type="text"
                      className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                      {...register('lastName', { required: 'Last name is required' })}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
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
                      defaultValue={user?.email || ''}
                      {...register('email', { 
                        required: 'Email is required', 
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="form-label" htmlFor="phone">Phone Number*</label>
                    <input
                      id="phone"
                      type="tel"
                      className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                      {...register('phone', { required: 'Phone number is required' })}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="form-label" htmlFor="address">Address*</label>
                  <input
                    id="address"
                    type="text"
                    className={`form-input ${errors.address ? 'border-red-500' : ''}`}
                    {...register('address', { required: 'Address is required' })}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="form-label" htmlFor="city">City*</label>
                    <input
                      id="city"
                      type="text"
                      className={`form-input ${errors.city ? 'border-red-500' : ''}`}
                      {...register('city', { required: 'City is required' })}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="form-label" htmlFor="state">State*</label>
                    <input
                      id="state"
                      type="text"
                      className={`form-input ${errors.state ? 'border-red-500' : ''}`}
                      {...register('state', { required: 'State is required' })}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="form-label" htmlFor="zip">ZIP Code*</label>
                    <input
                      id="zip"
                      type="text"
                      className={`form-input ${errors.zip ? 'border-red-500' : ''}`}
                      {...register('zip', { required: 'ZIP code is required' })}
                    />
                    {errors.zip && (
                      <p className="text-red-500 text-xs mt-1">{errors.zip.message}</p>
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
                      <div className="ml-3 flex-grow">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
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
                  disabled={isSubmitting}
                  className="w-full py-3 bg-primary text-white rounded-md font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing Order...
                    </>
                  ) : (
                    'Place Order'
                  )}
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