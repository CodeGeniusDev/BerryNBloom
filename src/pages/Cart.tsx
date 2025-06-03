import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const Cart: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  if (cart.length === 0) {
    return (
      <div className="pt-20 sm:pt-32 pb-12 sm:pb-16 min-h-screen flex items-center">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4" />
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products" className="inline-block px-6 py-2 sm:px-8 sm:py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;
  
  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-4 sm:p-6"
            >
              <div className="border-b border-gray-100 pb-2 mb-4">
                <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                  <span>Product</span>
                  <span>Total</span>
                </div>
              </div>
              
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
              
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={() => navigate('/products')}
                  className="text-primary hover:text-primary/80 font-medium transition-colors text-sm sm:text-base"
                >
                  Continue Shopping
                </button>
                
                <button
                  onClick={clearCart}
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm sm:text-base"
                >
                  Clear Cart
                </button>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-lg sm:text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm sm:text-base">
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
                
                <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold text-sm sm:text-base">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-2 sm:py-3 bg-primary text-white rounded-md font-semibold flex items-center justify-center hover:bg-primary/90 transition-colors text-sm sm:text-base"
              >
                Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;